import { IApiResDto } from 'src/dto/api.res.dto';

/** 登录接口返回的数据 */
export interface ILoginRes extends IApiResDto {
  mobile: string;
  email: string;
  username: string;
  isDel: number;
  name: string;
  status: number;
  platform: number;
  token: string;
}
