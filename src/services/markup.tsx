const getMarkupDetails = async (uid: number) => {
  try {
    return {}
  } catch (err) {
    console.log('error', err)
    return err?.response?.data
  }
}

const getMarkupDetailsByID = async (id: number) => {
  try {
    return {}
  } catch (err) {
    console.log('error', err)
    return err?.response?.data
  }
}

const createMarkupDetail = async (uid: number, data: any) => {
  try {
    return {}
  } catch (err) {
    console.log('error', err)
    return err?.response?.data
  }
}

const createConversationMarkup = async (id: number, data: any) => {
  try {
    return {}
  } catch (err) {
    console.log('error', err)
    return err?.response?.data
  }
}

const createConversationThreads = async (id: number, data: any) => {
  try {
    return {}
  } catch (err) {
    console.log('error', err)
    return err?.response?.data
  }
}

export {
  getMarkupDetails,
  createMarkupDetail,
  getMarkupDetailsByID,
  createConversationMarkup,
  createConversationThreads,
}
