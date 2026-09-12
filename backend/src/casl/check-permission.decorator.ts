import { SetMetadata } from '@nestjs/common'

export const PERMISSION_KEY = 'permission_code'
export const CheckPermission = (code: string) => SetMetadata(PERMISSION_KEY, code)
