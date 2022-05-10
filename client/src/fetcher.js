import config from './config.json'

const getShowDetail = async (tid) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/basic?TVShow=${tid}`, {
        method: 'GET',
    })
    return res.json()
}

const getAllShows = async () => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/basic/allshows`, {
        method: 'GET',
    })
    return res.json()
}

const getBirthYearDirectorTV = async (user_birthyear, isChecked) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/birthyear?userBirthyear=${user_birthyear}&isEnglish=${isChecked}`, {
        method: 'GET',
    })
    return res.json()
}

const getAllShowsBasedOnRating = async (minRating, maxRating) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/basic/ratings?minRating=${minRating}&maxRating=${maxRating}`, {
        method: 'GET',
    })
    return res.json()
}

const getShowsBasedOnUser = async (minRating, maxRating, director_name, actor_name, startYear, endYear) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/advancedsearch?minRating=${minRating}&maxRating=${maxRating}&director_name=${director_name}&actor_name=${actor_name}&startYear=${startYear}&endYear=${endYear}`, {
        method: 'GET',
    })
    return res.json()
}

const getShowsBasedOnRuntime = async (min, max) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/rangeruntime?minRangeRunTime=${min}&maxRangeRunTime=${max}`, {
        method: 'GET',
    })
    return res.json()
}

const getLongestRunningTVShow = async (min, max) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/longestRunning?minYears=${min}&maxYears=${max}`, {
        method: 'GET',
    })
    return res.json()
}

const directorInXShows = async (director, minSize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/director?director=${director}&minSize=${minSize}`, {
        method: 'GET',
    })
    return res.json()
}

const getCastSize = async (minSize, maxSize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/cast?minSize=${minSize}&maxSize=${maxSize}`, {
        method: 'GET',
    })
    return res.json()
}

const getGenreTVWriter = async (genre) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/writers?genre=${genre}`, {
        method: 'GET',
    })
    return res.json()
}

const getBirthYearWriter = async (birthYear, isChecked) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/birthyear/writers?userBirthyear=${birthYear}&isEnglish=${isChecked}`, {
        method: 'GET',
    })
    return res.json()
}

const getBirthYearActor = async (birthYear, isChecked) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/birthyear/actors?userBirthyear=${birthYear}&isEnglish=${isChecked}`, {
        method: 'GET',
    })
    return res.json()
}

const getBirthYearShows = async (birthYear, isChecked) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/birthyear/shows?userBirthyear=${birthYear}&isEnglish=${isChecked}`, {
        method: 'GET',
    })
    return res.json()
}

const getWatchList = async (id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/watchlist?id=${id}`, {
        method: 'GET',
    })
    return res.json()
}

const addToWatchlist = async (tid) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/add?tid=${tid}`, {
        method: 'POST',
    })
    return res.json()
}

const removeFromWatchlist = async (tid) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/remove?tid=${tid}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(null)
    })
    return res.json()
}

const clearWatchList = async () => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/clear`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(null)
    })
    return res.json()
}

export {
    getShowDetail,
    getAllShows,
    getBirthYearDirectorTV,
    getAllShowsBasedOnRating,
    getShowsBasedOnUser,
    getShowsBasedOnRuntime,
    getLongestRunningTVShow,
    directorInXShows,
    getCastSize,
    getGenreTVWriter,
    getBirthYearWriter,
    getBirthYearActor,
    getBirthYearShows,
    getWatchList,
    addToWatchlist,
    removeFromWatchlist,
    clearWatchList
}

