import { getPasswords } from "@/actions/get-passwords"

export async function getData() {
  const data = await getPasswords()
  if (data.result) {
    return data.result
  } else {
    return data.error
  }
}
