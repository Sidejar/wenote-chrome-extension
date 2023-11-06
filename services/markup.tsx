import { get, post } from "./http"

const getMarkupDetails = async (uid: number) => {
  try {
    return await get(`user/${uid}/markup`)
  } catch (err) {
    console.log("error", err)
    return err?.response?.data
  }
}

const getMarkupDetailsByID = async (id: number) => {
  try {
    return await get(`markup/${id}`)
  } catch (err) {
    console.log("error", err)
    return err?.response?.data
  }
}

const createMarkupDetail = async (uid: number, data: any) => {
  try {
    return await post(`markup/${uid}`, data)
  } catch (err) {
    console.log("error", err)
    return err?.response?.data
  }
}

const createConversationMarkup = async (id: number, data: any) => {
  try {
    return await post(`conversation/${id}`, data)
  } catch (err) {
    console.log("error", err)
    return err?.response?.data
  }
}

const createConversationThreads = async (id: number, data: any) => {
  try {
    return await post(`threads/${id}`, data)
  } catch (err) {
    console.log("error", err)
    return err?.response?.data
  }
}

export {
  getMarkupDetails,
  createMarkupDetail,
  getMarkupDetailsByID,
  createConversationMarkup,
  createConversationThreads
}
