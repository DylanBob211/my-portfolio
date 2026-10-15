'use server'
import { createFormToken } from '../formToken'

export default async function issueFormToken(): Promise<string> {
  return createFormToken()
}
