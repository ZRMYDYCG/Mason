import svgCaptcha from 'svg-captcha';
import { customAlphabet } from 'nanoid';

const captchaStore = new Map<string, { text: string; type: string; expires: number }>();
const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10);

class CaptchaService {
  constructor() {
    setInterval(() => {
      const now = Date.now();
      captchaStore.forEach((value, key) => {
        if (value.expires < now) {
          captchaStore.delete(key);
        }
      });
    }, 60 * 1000);
  }

  async getGraphicCaptcha() {
    const captcha = svgCaptcha.create({
      size: 4,
      ignoreChars: '0o1i',
      noise: 2,
      color: true,
      background: '#cc9966',
      width: 120,
      height: 40,
    });
    const id = nanoid();
    this.storeCaptcha(id, captcha.text, 'graphic');
    return { id, svg: captcha.data };
  }

  async getArithmeticCaptcha() {
    const captcha = svgCaptcha.createMathExpr({
      mathMin: 1,
      mathMax: 9,
      mathOperator: '+-',
      color: true,
      background: '#cc9966',
      width: 120,
      height: 40,
    });
    const id = nanoid();
    this.storeCaptcha(id, captcha.text, 'arithmetic'); 
    return { id, svg: captcha.data };
  }

  async getSliderCaptcha() {
    const id = nanoid();
    
    const width = 300;
    const height = 150;
    const puzzleSize = 40;
    const padding = 10;
    const tabRadius = 6;
    
    const x = Math.floor(Math.random() * (width - puzzleSize - tabRadius - padding * 2)) + padding + puzzleSize; 
    const y = Math.floor(Math.random() * (height - puzzleSize - padding * 2)) + padding;
    
    // Store answer
    this.storeCaptcha(id, x.toString(), 'slider');

    const color = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    const shapes = Array.from({length: 10}).map(() => {
        const cx = Math.random() * width;
        const cy = Math.random() * height;
        const r = Math.random() * 20 + 10;
        const fill = `#${Math.floor(Math.random()*16777215).toString(16)}`;
        return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" opacity="0.5" />`;
    }).join('');
    
    const l = puzzleSize;
    const r = tabRadius;
    
    const puzzlePath = `
        M ${x} ${y} 
        h ${l} 
        v ${l/2 - r} 
        c ${r},${-2} ${r},${r*2+2} 0,${r*2}
        v ${l/2 - r} 
        h -${l} 
        z
    `;

    const bgSvg = `
        <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="${color}" />
            ${shapes}
            <path d="${puzzlePath}" fill="rgba(0,0,0,0.5)" stroke="white" stroke-width="2"/>
        </svg>
    `;
    
    const vbPadding = 2;
    const vbWidth = l + r + vbPadding * 2;
    const vbHeight = l + vbPadding * 2;
    const vbX = x - vbPadding;
    const vbY = y - vbPadding;
    
    const puzzleSvg = `
        <svg width="${vbWidth}" height="${vbHeight}" viewBox="${vbX} ${vbY} ${vbWidth} ${vbHeight}" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <clipPath id="cp">
                    <path d="${puzzlePath}" />
                </clipPath>
            </defs>
            <g clip-path="url(#cp)">
                <rect x="0" y="0" width="${width}" height="${height}" fill="${color}" />
                ${shapes}
            </g>
            <path d="${puzzlePath}" stroke="white" stroke-width="2" fill="none"/>
        </svg>
    `;

    const bgBase64 = `data:image/svg+xml;base64,${Buffer.from(bgSvg).toString('base64')}`;
    const puzzleBase64 = `data:image/svg+xml;base64,${Buffer.from(puzzleSvg).toString('base64')}`;

    return {
      id,
      bgUrl: bgBase64,
      puzzleUrl: puzzleBase64,
      y, 
    };
  }

  async getRotateCaptcha() {
    const id = nanoid();
    const angle = Math.floor(Math.random() * 300);
    this.storeCaptcha(id, angle.toString(), 'rotate');
    return {
      id,
      imgUrl: 'https://picsum.photos/200/200',
    };
  }

  async getClickCaptcha() {
    const id = nanoid();

    const chars = ['A', 'B', 'C', 'D', 'E', 'F', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const selected = [];
    const points = [];
    
    for(let i=0; i<4; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        selected.push(char);
        points.push({
            char,
            x: Math.floor(Math.random() * 200) + 50, // Avoid edges
            y: Math.floor(Math.random() * 100) + 50,
            color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
            angle: Math.floor(Math.random() * 60) - 30
        });
    }
    
    const code = selected.join('');
 
    this.storeCaptcha(id, JSON.stringify(points), 'click');
    
    const width = 300;
    const height = 200;
    const texts = points.map(p => 
        `<text x="${p.x}" y="${p.y}" fill="${p.color}" font-size="30" font-weight="bold" text-anchor="middle" dominant-baseline="central" transform="rotate(${p.angle}, ${p.x}, ${p.y})">${p.char}</text>`
    ).join('');
    
    const noise = Array.from({length: 5}).map(() => 
        `<line x1="${Math.random()*width}" y1="${Math.random()*height}" x2="${Math.random()*width}" y2="${Math.random()*height}" stroke="gray" opacity="0.3" />`
    ).join('');
    
    const svg = `
        <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" style="background-color: #f0f2f5;">
            ${noise}
            ${texts}
        </svg>
    `;
    
    const imgUrl = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
    
    return {
      id,
      imgUrl,
      prompt: `请依次点击: ${selected.join(' ')}`,
    };
  }

  async verify(id: string, answer: any) {
    const stored = captchaStore.get(id);
    if (!stored) {
      return false;
    }
    
    captchaStore.delete(id);
    
    if (stored.expires < Date.now()) {
      return false;
    }

    if (stored.type === 'slider') {
      const target = parseInt(stored.text);
      const userVal = parseInt(answer);
      return Math.abs(target - userVal) < 5;
    }
    
    if (stored.type === 'rotate') {
      const target = parseInt(stored.text);
      const userVal = parseInt(answer);
      return Math.abs(target - userVal) < 10;
    }
    
    if (stored.type === 'click') {
        try {
            const targetPoints = JSON.parse(stored.text);
            const userPoints = answer;
            
            if (!Array.isArray(userPoints) || userPoints.length !== targetPoints.length) {
                return false;
            }
            
            return userPoints.every((point, index) => {
                const target = targetPoints[index];
                const distance = Math.sqrt(
                    Math.pow(point.x - target.x, 2) + 
                    Math.pow(point.y - target.y, 2)
                );
                return distance < 40; 
            });
        } catch (e) {
            return false;
        }
    }

    return stored.text.toLowerCase() === String(answer).toLowerCase();
  }

  private storeCaptcha(id: string, text: string, type: string) {
    captchaStore.set(id, {
      text,
      type,
      expires: Date.now() + 5 * 60 * 1000,
    });
  }
}

export default new CaptchaService();
