import { resConnector } from '../../../commons/CustomAxios';

export const search = async (
  keySearch,
  isCourseOnly = false,
  isList = false,
  query = null
) => {
  // const newQuery = query || { ...query };
  // console.log(newQuery);
  // newQuery['topic'] = newQuery.topic.join(' ');

  try {
    const response = await resConnector({
      url: '/course/search',
      method: 'get',
      params: { q: keySearch, isCourseOnly, ...query },
    });
    if (response.status) {
      let options = [...response.data.data];
      options = options.reduce((result, item) => {
        const { name, slug, fristName, lastName, _id } = item;
        if (name && slug) {
          result.push({ groupBy: 'Khóa học', name, slug, _id });
        } else if (fristName && lastName && _id) {
          result.push({
            groupBy: 'Tác giả',
            name: `${fristName} ${lastName}`,
            _id,
          });
        }
        return result;
      }, []);
      return !isList ? options : response.data.data;
    }
  } catch (error) {
    console.log(error);
  }
};
