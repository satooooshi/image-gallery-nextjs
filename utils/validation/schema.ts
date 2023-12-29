import * as Yup from 'yup';
const requireMessage = '入力必須です。';
const emailFormatMessage = 'メールアドレスの形式で入力してください。';
const phoneFormatMessage = '電話番号の形式で入力してください。';
const blankMixedMessage = '空白文字は使用できません。';
const minEightTextMessage = '8文字以上で入力してください。';
const minDateMessage = '開始日時は終了日時より前に設定してください。';
const minTagsMessage = 'タグは一つ以上設定してください。';
// const minUsersMessage = 'チャットメンバーは一人以上設定してください';
const unmatchPasswordConfirmation = 'パスワードが一致しません。';
const nWordLimitMessage = (len: number) => `${len}文字以内で入力してください。`;
const afterNowMessage = '現在の日時以降に設定してください。';
const beforeNowMessage = '現在の日付より前に設定してください。';
const kanaFormatMessage = 'カタカナのみで入力してください。';
// const minHostUsersMessage = '開催者/講師は一人以上設定してください';

export const loginSchema = Yup.object().shape({
  email: Yup.string().required(`メールアドレスは${requireMessage}`),
  password: Yup.string().required(`パスワードは${requireMessage}`),
});

export const wikiSchema = Yup.object().shape({
  title: Yup.string().required(requireMessage).max(100, nWordLimitMessage(100)),
  body: Yup.string().required(requireMessage),
  type: Yup.string().required('タイプを選択してください。'),
});

export const updatePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().required(requireMessage),
  newPassword: Yup.string()
    .matches(/^([^ ]*)$/, blankMixedMessage)
    .min(8, minEightTextMessage)
    .required(requireMessage),
  newPasswordConfirmation: Yup.string()
    .required(requireMessage)
    .oneOf([Yup.ref('newPassword'), null], unmatchPasswordConfirmation),
});

export const createEventSchema = Yup.object().shape({
  title: Yup.string()
    .required(`タイトルは${requireMessage}`)
    .max(100, `タイトルは${nWordLimitMessage(100)}`),
  startAt: Yup.date()
    .required(`開始日時は${requireMessage}`)
    .min(new Date(), `開始日時は${afterNowMessage}`),
  endAt: Yup.date()
    .min(Yup.ref('startAt'), minDateMessage)
    .required(`終了日時は${requireMessage}`),
  tags: Yup.array().min(1, minTagsMessage),
  type: Yup.string().required(`タイプを選択してください`),
});

export const createAwardSchema = Yup.object().shape({
  thumbnailUrl: Yup.string().required(`サムネイル画像は${requireMessage}`),
  awardedAt: Yup.string().required(`受賞年度は${requireMessage}`),
  rank: Yup.string().required(`賞のタイプは${requireMessage}`),
  awardee: Yup.object().required(`受賞者は${requireMessage}`),
  description: Yup.string()
    .required(`受賞理由は${requireMessage}`)
    .max(2000, `受賞理由は${nWordLimitMessage(2000)}`),
});

const profileValidation = {
  email: Yup.string()
    .matches(
      /^([\w!#$%&'*+\-\/=?^`{|}~]+(\.[\w!#$%&'*+\-\/=?^`{|}~]+)*|"([\w!#$%&'*+\-\/=?^`{|}~. ()<>\[\]:;@,]|\\[\\"])+")@(([a-zA-Z\d\-]+\.)+[a-zA-Z]+|\[(\d{1,3}(\.\d{1,3}){3}|IPv6:[\da-fA-F]{0,4}(:[\da-fA-F]{0,4}){1,5}(:\d{1,3}(\.\d{1,3}){3}|(:[\da-fA-F]{0,4}){0,2}))\])$/,
      emailFormatMessage,
    )
    .required(`メールアドレスは${requireMessage}`),
  displayName: Yup.string()
    .required(`ユーザー名は${requireMessage}`)
    .max(50, `ユーザー名は${nWordLimitMessage(50)}`),
  birthdate: Yup.date()
    .max(new Date(), `生年月日は${beforeNowMessage}`)
    .required(`生年月日は${requireMessage}`),
};

export const emailSchema = Yup.object().shape({
  email: Yup.string()
  .matches(
    /^([\w!#$%&'*+\-\/=?^`{|}~]+(\.[\w!#$%&'*+\-\/=?^`{|}~]+)*|"([\w!#$%&'*+\-\/=?^`{|}~. ()<>\[\]:;@,]|\\[\\"])+")@(([a-zA-Z\d\-]+\.)+[a-zA-Z]+|\[(\d{1,3}(\.\d{1,3}){3}|IPv6:[\da-fA-F]{0,4}(:[\da-fA-F]{0,4}){1,5}(:\d{1,3}(\.\d{1,3}){3}|(:[\da-fA-F]{0,4}){0,2}))\])$/,
    emailFormatMessage,
  )
  .required(`メールアドレスは${requireMessage}`),
});

export const profileSchema = Yup.object().shape({
  ...profileValidation,
});

export const adminEditUserProfileSchema = Yup.object().shape({
  ...profileValidation,
  password: Yup.string()
    .matches(/^([^ ]*)$/, `パスワードには${blankMixedMessage}`)
    .min(8, `パスワードは${minEightTextMessage}`),
});

export const registerSchema = Yup.object().shape({
  ...profileValidation,
  password: Yup.string()
    .matches(/^([^ ]*)$/, blankMixedMessage)
    .min(8, `パスワードは${minEightTextMessage}`)
    .required(`パスワードは${minEightTextMessage}`),
});

export const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .matches(/^([^ ]*)$/, blankMixedMessage)
    .min(8, `パスワードは${minEightTextMessage}`)
    .required(`パスワードは${minEightTextMessage}`),
  password2: Yup.string()
    .required(requireMessage)
    .oneOf([Yup.ref('password'), null], unmatchPasswordConfirmation),
});

export const albumSchema = Yup.object().shape({
  title: Yup.string().required('タイトルを設定してください'),
  images: Yup.array().min(1, '画像を一つ以上選択してください'),
});

export const noteSchema = Yup.object().shape({
  content: Yup.string().required(requireMessage),
});

export const editEventIntroductionSchema = Yup.object().shape({
  title: Yup.string()
    .required(`タイトルは${requireMessage}`)
    .max(100, `タイトルは${nWordLimitMessage(100)}`),
  description: Yup.string().required(`説明文は${requireMessage}`),
});

export const chatGroupSchema = Yup.object().shape({
  name: Yup.string()
    .required(`タイトルは${requireMessage}`)
    .max(50, `ルーム名は${nWordLimitMessage(50)}`),
  // members: Yup.array().min(1, minUsersMessage),
});

export const topNewsSchema = Yup.object().shape({
  urlPath: Yup.string().required(requireMessage),
  title: Yup.string()
    .required(requireMessage)
    .max(100, `タイトルは${nWordLimitMessage(100)}`),
});
