import { extname } from "path";

export const editiFileName = (req: any, file: any, callbakc: any) => {

  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString())
    .join('.');
  callbakc(null, `${name}-${randomName}${fileExtName}`)

  return randomName
}