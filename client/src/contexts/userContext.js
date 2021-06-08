import { createContext, useReducer } from "react"

export const UserContext = createContext()
const initialState = {
  isLogin: false,
  user: "user",
  isVisibleRegister: false,
  isVisibleLogin: false,
  isVisibleEditProfile: false,
  isVisiblePopupPayment: false,
  isVisiblePopupBuy: false,
  isVisiblePaymentGateway: false,
  myFilmLists: null,
  editProfileModal: [],
  editIsPressed: 0,
}

const reducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case "ISPRESSED":
      return { ...state, editIsPressed: state.editIsPressed + 1 }
    case "MYFILMS":
      return {
        ...state,
        myFilmLists: payload,
      }
    case "USER_SUCCESS":
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", payload.token)
      return {
        ...state,
        isLogin: true,
        isVisibleRegister: false,
        isVisibleLogin: false,
        user: payload,
      }
    case "AUTH_ERROR":
    case "LOGOUT":
      localStorage.removeItem("token")
      return {
        ...state,
        isLogin: false,
        user: null,
      }
    case "POPUPPAYMENTBUKA":
      return {
        ...state,
        isVisiblePopupPayment: true,
      }
    case "POPUPPAYMENTTUTUP":
      return {
        ...state,
        isVisiblePopupPayment: false,
      }
    case "POPUPBUYBUKA":
      return {
        ...state,
        isVisiblePopupBuy: true,
      }
    case "POPUPBUYTUTUP":
      return {
        ...state,
        isVisiblePopupBuy: false,
      }
    case "EDITPROFILEBUKA":
      return {
        ...state,
        isVisibleEditProfile: true,
        editProfileModal: payload,
      }
    case "EDITPROFILETUTUP":
      return {
        ...state,
        isVisibleEditProfile: false,
        editProfileModal: [],
      }
    case "PAYMENTGATEWAYTUTUP":
      return {
        ...state,
        isVisiblePaymentGateway: false,
      }
    case "PAYMENTGATEWAYBUKA":
      return {
        ...state,
        isVisiblePaymentGateway: true,
      }
    case "LOGINMODALBUKA":
      return {
        ...state,
        isVisibleLogin: true,
      }
    case "LOGINMODALTUTUP":
      return {
        ...state,
        isVisibleLogin: false,
      }
    case "REGISTERMODALBUKA":
      return {
        ...state,
        isVisibleRegister: true,
      }
    case "REGISTERMODALTUTUP":
      return {
        ...state,
        isVisibleRegister: false,
      }
    case "DONATEMODALBUKA":
      return {
        ...state,
        isVisibleDonate: true,
        modalBuy: payload,
      }
    case "DONATEMODALTUTUP":
      return {
        ...state,
        isVisibleDonate: false,
        modalBuy: "",
      }
    case "APPROVEMODALBUKA":
      return {
        ...state,
        isVisibleApprove: true,
        fundID: payload.id,
        approveListModal: payload.approveModal,
      }
    case "APPROVEMODALTUTUP":
      return {
        ...state,
        isVisibleApprove: false,
        approveListModal: [],
      }
    case "TRANSACTIONMODALBUKA":
      return {
        ...state,
        isVisibleTransaction: true,
        buktiTransfer: payload,
      }
    case "TRANSACTIONMODALTUTUP":
      return {
        ...state,
        isVisibleTransaction: false,
      }
    default:
      throw new Error()
  }
}

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  )
}
