import { Op } from 'sequelize'
import ChatModel from '../models/chat.model'

class ChatService {
  async allChatRecords() {
    const records = await ChatModel.findAll()
    return records
  }
  async betweenChatRecords(recipient_id: number, send_id: number) {
    try {
      const records = await ChatModel.findAll({
        where: {
          [Op.or]: [
            {
              recipient_id: recipient_id,
              send_id: send_id,
            },
            {
              recipient_id: send_id,
              send_id: recipient_id,
            },
          ],
        },
        order: [['id', 'ASC']],
      })
      return records
    } catch (error) {
      console.log(error)
    }
  }
  async send(data: any) {
    try {
      const res = await ChatModel.create({
        ...data,
        createdAt: new Date(),
        timestamp: new Date().getTime(),
        isRead: 0,
        status: 1,
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export default new ChatService()
