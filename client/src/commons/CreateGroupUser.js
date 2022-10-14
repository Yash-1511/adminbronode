const fetchOptions = {
  mode: 'cors',
  method: 'POST',
  headers: {
    authorization:
      'key=AAAAcibDysY:APA91bE-GBKieMq1ylWMJk8DxyzRTtalurHrZFgipiNatb4eCM5UBsvz9AyC5LdiT1xCxDhaqLojjU_h-qH5j8aOIx-bgdn-BUa1pV6n8OylUibEcV5PnmGgKqRetLMApmdAlD9qL_nj',
    'content-type': 'application/json',
  },
};

export const registerGroupUser = (token) => {
  fetch(
    `https://iid.googleapis.com/iid/v1/${token}/rel/topics/all`,
    fetchOptions
  )
    // .then((res) => )
    .catch((err) => console.log(err));
};
