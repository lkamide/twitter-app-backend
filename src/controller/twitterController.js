const axios  = require('axios')

async function findUserId (request){
  const {TWITTER_URL, TWITTER_TOKEN} = process.env
  console.log("entrei no get")
  let user =  await axios.get(`${TWITTER_URL}2/users/by?usernames=${request.params.username}`, { headers: { 'Authorization': `Bearer ${TWITTER_TOKEN}` } }) 
  return user.data.data[0]
}

var module = module.exports = {
  
  async getMention (request, response) {
    
  const {TWITTER_URL, TWITTER_TOKEN} = process.env

   let resultado = await axios.get(`${TWITTER_URL}2/users/${request.params.user}/mentions`,
    { headers: { 'Authorization': `Bearer ${TWITTER_TOKEN}` } 
  }) 

   
    return response.json({body: resultado.data})
  },

  async getUserId (request, response) {
    
    let user = await findUserId(request)
    return response.json(user)
    
  },

  async hashtagSearch (request, response){ 
    const { TWITTER_URL, TWITTER_TOKEN } = process.env
   
    const { search } = request.params
    let searchResult = ""
    try {
      searchResult = await axios.get(`${TWITTER_URL}1.1/search/tweets.json?q=%23${search}&result_type=recent`,
        { headers: { 'Authorization': `Bearer ${TWITTER_TOKEN}` } 
      }) 
    } catch (error) {
      return error
    }
    
    return searchResult
  },

  async tweetCount ( request, response) { 
    const { TWITTER_URL, TWITTER_TOKEN } = process.env
    const { search } = request.params
    let searchResult = ""
    try {
      searchResult = await axios.get(`${TWITTER_URL}2/tweets/counts/recent?query=${search}&granularity=day`,
        { headers: { 'Authorization': `Bearer ${TWITTER_TOKEN}` } 
      }) 
    } catch (error) {
      return error
    }

    return searchResult
  },

  async getLastTweets (request) {
    
    const { TWITTER_URL, TWITTER_TOKEN } = process.env
    const { user } = request.params
    let searchResult = ""
    try {
      searchResult = await axios.get(`${TWITTER_URL}2/users/${user}/tweets`,
        { headers: { 'Authorization': `Bearer ${TWITTER_TOKEN}` } 
      }) 
    } catch (error) {
      return error
    }

    return searchResult

  },

  async fetchUserInfos (request, response){
    let user = await findUserId(request)
    request.params.user = user.id
    request.params.search = user.username
    let search = await module.hashtagSearch(request, response)
    let tweetCount = await module.tweetCount(request, response)
    let lasTweets = await module.getLastTweets(request)
    
    let res = { 
      data: search.data,
      count: tweetCount.data,
      lastTweets: lasTweets.data
    }

    return response.json(res)
  },
}