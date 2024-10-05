const messages = {
  authorization: {
    uz: "Avtorizatsiya uchun kontaktingizni ulashing",
    ru: "Поделитесь контактом для авторизации",
    en: "Share your contact for authorization",
  },
  shareNumber: {
    uz: "Raqamni ulashish",
    ru: "Поделить номер",
    en: "Share number",
  },
  mainMenu: {
    uz: "Xizmatni tanlang",
    ru: "Выберите услугу",
    en: "Select a service",
  },
  purchases: {
    uz: "Haridlar",
    ru: "Закупки",
    en: "Purchases",
  },
  payments: {
    uz: "To'lovlar",
    ru: "Платежи",
    en: "Payments",
  },
  languageChanged: {
    uz: "Til o'zgartirildi",
    ru: "Язык был изменен",
    en: "Language has been changed",
  },
  phoneChanged: {
    uz: "Telefon raqami o'zgartirildi",
    ru: "Номер телефона был изменен",
    en: "Phone number has been changed",
  },
  verifySuccess: {
    uz: "Foydalanuvchi tasdiqlandi",
    ru: "Пользователь подтвержден",
    en: "User has been verified",
  },
  verifyError: {
    uz: "Foydalanuvchi tasdiqlanmadi",
    ru: "Пользователь не подтвержден",
    en: "User has not been verified",
  },
  purchaseMenu: {
    uz: "Harid xizmatini tanlang",
    ru: "Выберите услугу покупки",
    en: "Select a purchase service",
  },
  paymentMenu: {
    uz: "To'lov xizmatini tanlang",
    ru: "Выберите услугу платеж",
    en: "Select a payment service",
  },
  addPurchase: {
    uz: "Harid yaratish",
    ru: "Добавить заказ на закупку",
    en: "Add a purchase",
  },
  ordersInProgress: {
    uz: "Jarayondagi buyurtmalar",
    ru: "Необработанные",
    en: "Orders in progress",
  },
  confirmedOrders: {
    uz: "Tasdiqlangan buyurtmalar",
    ru: "Подтвержденные",
    en: "Confirmed orders",
  },
  ordersOnWay: {
    uz: "Yo'ldagi buyurtmalar",
    ru: "В пути",
    en: "Orders on the way",
  },
  completedPurchases: {
    uz: "Tugalangan haridlar",
    ru: "Завершение закупки",
    en: "Completed purchases",
  },
  inDebt: {
    uz: "Qarzdorlik",
    ru: "Долг",
    en: "In debt",
  },
  addOutgoingPayment: {
    uz: "Chiqim to'lov yaratish",
    ru: "Добавить исходящие платежи",
    en: "Add outgoing payment",
  },
  reviseAct: {
    uz: "Akt sverka",
    ru: "Акт сверка",
    en: "Revise act",
  },
  backButton: {
    uz: "🔙 Orqaga",
    ru: "🔙 Назад",
    en: "🔙 Back",
  },
  selectProduct: {
    uz: "Maxsulot tanglang",
    ru: "Выберите товар",
    en: "Select a product",
  },
  selectProductFirst: {
    uz: "Avval maxsulot tanglang",
    ru: "Сначала выберите товар",
    en: "Select a product first",
  },
  enterQuantity: {
    uz: "Kerakli miqdorni yozing",
    ru: "Введите количество",
    en: "Enter quantity",
  },
  leaveComment: {
    uz: "Izoh qoldiring",
    ru: "Введите комментарий",
    en: "Leave a comment",
  },
  ordersSummary: {
    uz: (products: { name: string; quantity: string }[], comment: string) => {
      let text = "Kiritgan ma'lumotlaringiz to'g'rimi?\n\n";

      for (const [i, product] of products.entries()) {
        text += `${i + 1} - maxsulot: ${product.name}\n`;
        text += `Miqdori: ${product.quantity}\n\n`;
      }

      return text + `Izoh: ${comment}`;
    },
    ru: (products: { name: string; quantity: string }[], comment: string) => {
      let text = "Вы правильно ввели данные?\n\n";

      for (const [i, product] of products.entries()) {
        text += `${i + 1} - продукт: ${product.name}\n`;
        text += `Количество: ${product.quantity}\n\n`;
      }

      return text + `Коментарий: ${comment}`;
    },
    en: (products: { name: string; quantity: string }[], comment: string) => {
      let text = "Is the information you entered correct?\n\n";

      for (const [i, product] of products.entries()) {
        text += `${i + 1} - product: ${product.name}\n`;
        text += `Quantity: ${product.quantity}\n\n`;
      }

      return text + `Comment: ${comment}`;
    },
  },
  yesButton: {
    uz: "На",
    ru: "Да",
    en: "Yes",
  },
  noButton: {
    uz: "Yo'q",
    ru: "Нет",
    en: "No",
  },
  editButton: {
    uz: "O'zgartirish",
    ru: "Изменить",
    en: "Edit",
  },
  noProductsFound: {
    uz: "Hech qanday mahsulot topilmadi",
    ru: "Продуктов не найдено",
    en: "No products found",
  },
  commentButton: {
    uz: "Izoh",
    ru: "Комментарий",
    en: "Continue",
  },
  processCancelled: {
    uz: "Jarayon bekor qilindi",
    ru: "Процесс был отменен",
    en: "Process has been cancelled",
  },
  productAdded: {
    uz: "Mahsulot qo'shildi. Yana bir nechta mahsulot qo'shing yoki «Izoh» tugmasini bosing",
    ru: "Продукт был добавлен. Добавьте еще несколько продуктов или нажмите «Комментарий»",
    en: "Product has been added. Add more products or click «Comment»",
  },
  noOrdersFound: {
    uz: "Hech qanday buyurtma topilmadi",
    ru: "Заказы не найдены",
    en: "No orders found",
  },
  selectPeriod: {
    uz: "Vaqt kesimini tanglang",
    ru: "Выберите период",
    en: "Select a period",
  },
  oneDay: {
    uz: "Bir kunlik",
    ru: "За один день",
    en: "One day",
  },
  oneWeek: {
    uz: "Bir haftalik",
    ru: "За неделю",
    en: "One week",
  },
  oneMonth: {
    uz: "Bir oylik",
    ru: "За месяц",
    en: "One month",
  },
  allTime: {
    uz: "Hamma vaqt davomida",
    ru: "За все время",
    en: "All time",
  },
  noPurchasesFound: {
    uz: "Hech qanday harid topilmadi",
    ru: "Закупки не найдены",
    en: "No purchases found",
  },
  purchaseAdded: {
    uz: "Harid yaratildi",
    ru: "Заказ был добавлен",
    en: "Purchase has been added",
  },
  enterInfoAgain: {
    uz: "Ma'lumotlarni qaytadan kiriting",
    ru: "Введите данные заново",
    en: "Enter the information again",
  },
  yourAccountBalance: {
    uz: (balance: number) => `Hisobingizdagi balans: ${balance}`,
    ru: (balance: number) => `Баланс вашего счета: ${balance}`,
    en: (balance: number) => `Your account balance: ${balance}`,
  },
  noReviseActsFound: {
    uz: "Hech qanday akt sverka topilmadi",
    ru: "Акт сверки не найдены",
    en: "No revise acts found",
  },
  selectPaymentCurrency: {
    uz: "To'lov volyutasini tanlang",
    ru: "Выберите валюту платежа",
    en: "Select a payment currency",
  },
  bankAccountNumber: {
    uz: "Bank hisob raqami",
    ru: "Номер банковского счета",
    en: "Bank account number",
  },
  enterPaymentAmount: {
    uz: "To'lov summasini kiriting",
    ru: "Введите сумму оплаты",
    en: "Enter the payment amount",
  },
  paymentSummary: {
    uz: (currency: string, amount: string, comment: string) => {
      let text = "Kiritgan ma'lumotlaringiz to'g'rimi?\n\n";
      text += `Valyuta: ${currency}\n\n`;
      text += `Tolov summasi ${currency}: ${amount}\n\n`;
      return text + `Izoh: ${comment}`;
    },
    ru: (currency: string, amount: string, comment: string) => {
      let text = "Вы правильно ввели данные?\n\n";
      text += `Валюта: ${currency}\n\n`;
      text += `Сумма оплаты ${currency}: ${amount}\n\n`;
      return text + `Комментарий: ${comment}`;
    },
    en: (currency: string, amount: string, comment: string) => {
      let text = "Is the information you entered correct?\n\n";
      text += `Currency: ${currency}\n\n`;
      text += `Payment amount ${currency}: ${amount}\n\n`;
      return text + `Comment: ${comment}`;
    },
  },
};

export default messages;
