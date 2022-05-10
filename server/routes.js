const config = require('./config.json')
const mysql = require('mysql');
const e = require('express');

const connection = mysql.createConnection({
    host: config.rds_host,
    user: config.rds_user,
    password: config.rds_password,
    port: config.rds_port,
    database: config.rds_db
});
connection.connect();


/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */

// Route 1 (function to recommend TV shows based on one or more of users preferences including
//ratings, director name, TvShow start and/or end Year, and/or actor name )
function userChoice(req, res) {
    let minRating = parseInt(req.query.minRating, 10);
    let maxRating = parseInt(req.query.maxRating, 10);
    minRating = isNaN(minRating) ? 0 : minRating;
    maxRating = isNaN(maxRating) ? 10: maxRating;
    let startYear = parseInt(req.query.startYear, 10);
    let endYear = parseInt(req.query.endYear, 10);
    startYear = isNaN(startYear) ? 1900 : startYear;
    endYear = isNaN(endYear) ? 2022 : endYear;

    const director_name = req.query.director_name!="undefined" ? req.query.director_name : '';
    const actor_name = req.query.actor_name!="undefined" ? req.query.actor_name : '';

    if (director_name === "" & actor_name === "") {
        connection.query(`
      SELECT DISTINCT t.tid AS tid, pTitle AS TV_Show, aveRating AS Rating, startYear, endYear, "Add to WatchList" AS Watch
      FROM Titles t
      JOIN Ratings r ON t.tid = r.tid
      WHERE r.aveRating >= ${minRating} AND r.aveRating <= ${maxRating} AND t.startYear >= ${startYear} AND t.endYear <= ${endYear}
      ORDER BY t.startYear, aveRating DESC;
    `, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    }
    else if (director_name != "" & actor_name === "") {
        connection.query(`
        WITH DirectorTitle AS (
                   SELECT DISTINCT d.tid, ip.name AS Director
                   FROM Directors d JOIN IMDBPerson ip ON d.pid = ip.pid
                   WHERE ip.name LIKE "%${director_name}%"
               ),
               DirectorTVShows AS (
                   SELECT d.tid, t.pTitle AS TV_Show, t.startYear, t.endYear, d.Director
                   FROM DirectorTitle d JOIN Titles t ON d.tid = t.tid
               )
        SELECT dtv.tid AS tid, TV_Show, Director, aveRating AS Rating, startYear, endYear, "Add to WatchList" AS Watch
        FROM DirectorTVShows dtv
        JOIN Ratings r ON dtv.tid = r.tid
        WHERE r.aveRating >= ${minRating} AND r.aveRating <= ${maxRating} AND dtv.startYear >= ${startYear} AND dtv.endYear <= ${endYear}
        ORDER BY dtv.startYear, aveRating DESC, dtv.Director;
      `, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    }

    else if (director_name === "" & actor_name != "") {
        connection.query(`
        WITH ActorTitle AS (
                   SELECT DISTINCT ci.tid, ip.name AS Actor
                   FROM Cast_In ci JOIN IMDBPerson ip ON ci.pid = ip.pid
                   WHERE ip.name LIKE "%${actor_name}%"
               ),
               ActorTVShows AS (
                   SELECT a.tid, t.pTitle AS TV_Show, t.startYear, t.endYear, a.Actor
                   FROM ActorTitle a JOIN Titles t ON a.tid = t.tid
               )
        SELECT atv.tid AS tid, TV_Show, Actor, aveRating AS Rating, startYear, endYear, "Add to WatchList" AS Watch
        FROM ActorTVShows atv
        JOIN Ratings r ON atv.tid = r.tid
        WHERE r.aveRating >= ${minRating} AND r.aveRating <= ${maxRating} AND atv.startYear >= ${startYear} AND atv.endYear <= ${endYear}
        ORDER BY atv.startYear, aveRating DESC, atv.Actor;
      `, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    }
    else {
        connection.query(`
        WITH DirectorTitle AS (
                   SELECT DISTINCT d.tid, ip.name AS Director
                   FROM Directors d JOIN IMDBPerson ip ON d.pid = ip.pid
                   WHERE ip.name LIKE "%${director_name}%" 
               ),
               ActorTitle AS (
                   SELECT DISTINCT d.tid, d.Director, ip.name AS Actor
                   FROM DirectorTitle d JOIN Cast_In ci ON d.tid = ci.tid
                   JOIN IMDBPerson ip ON ci.pid = ip.pid
                   WHERE ip.name LIKE "%${actor_name}%"
               ),
               DirectorActorTVShows AS (
                   SELECT a.tid, t.pTitle AS TV_Show, Director, Actor, t.startYear, t.endYear
                   FROM ActorTitle a JOIN Titles t ON a.tid = t.tid
               )
               
        SELECT datv.tid AS tid, TV_Show, Director, Actor, aveRating AS Rating, startYear, endYear, "Add to WatchList" AS Watch
        FROM DirectorActorTVShows datv
        JOIN Ratings r ON datv.tid = r.tid
        WHERE r.aveRating >= ${minRating} AND r.aveRating <= ${maxRating} AND datv.startYear >= ${startYear} AND datv.endYear <= ${endYear}
        ORDER BY datv.startYear, aveRating DESC, datv.Director, datv.Actor;
      `, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    }
}

//Route 2 (function to recommend TV shows based on range of run time of shows in minutes)
function getTVRunTime(req, res) {
    let minRangeRunTime = parseInt(req.query.minRangeRunTime, 10);
    let maxRangeRunTime = parseInt(req.query.maxRangeRunTime, 10);
    minRangeRunTime = isNaN(minRangeRunTime) ? 0 : minRangeRunTime;
    maxRangeRunTime = isNaN(maxRangeRunTime) ? 10000: maxRangeRunTime;
    connection.query(`
    SELECT DISTINCT t.tid as tid, t.pTitle as TV_Show, t.runtimeMinutes AS Runtime, "Add to WatchList" AS Watch
    FROM Titles t JOIN Ratings r ON t.tid = r.tid
    WHERE t.runtimeMinutes >= ${minRangeRunTime} AND t.runtimeMinutes <= ${maxRangeRunTime}
    ORDER BY t.runtimeMinutes DESC;
    `, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

//Route 3 (function to recommend TV shows based on number of years the show has been airing within a range)
function getLongestRunningTVShow(req, res) {
    let minYears = parseInt(req.query.minYears, 10);
    let maxYears = parseInt(req.query.maxYears, 10);
    minYears = isNaN(minYears) ? 20 : minYears;
    maxYears = isNaN(maxYears) ? 75: maxYears;
    
    connection.query(`
    SELECT DISTINCT t.tid as tid, t.pTitle AS TV_Show, (MAX(t.endYear) - MIN(t.startYear)) AS Years, "Add to WatchList" AS Watch
    FROM Titles t JOIN Ratings r ON t.tid = r.tid
    GROUP BY t.tid
    HAVING Years>=${minYears} AND Years<=${maxYears}
    ORDER BY Years DESC;
    `, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

//Route 4 (function to recommend TV shows based on all directors' work who share the user's birth year)
function getBirthYearDirectorTV(req, res) {
    let user_birthyear = parseInt(req.query.userBirthyear, 10);
    user_birthyear = isNaN(user_birthyear) ? 2000 : user_birthyear;

    if (req.query.isEnglish === "true") {
        connection.query(`
        SELECT DISTINCT  t.tid as tid, t.pTitle AS TV_Show, IP.name as Director, "Add to WatchList" AS Watch
        FROM Titles t JOIN Directors d ON d.tid = t.tid JOIN IMDBPerson IP on IP.pid = d.pid JOIN AdditionalTitles A on t.tid = A.tid
        WHERE t.type LIKE '%tvseries%' AND IP.birthYear=${user_birthyear} AND A.language="en";
        `, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    } else {
        connection.query(`
        SELECT DISTINCT  t.tid as tid, t.pTitle AS TV_Show, IP.name as Director, "Add to WatchList" AS Watch
        FROM Titles t JOIN Directors d ON d.tid = t.tid JOIN IMDBPerson IP on IP.pid = d.pid 
        WHERE t.type LIKE '%tvseries%' AND IP.birthYear=${user_birthyear};
        `, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    }

}

//Route 5 (function to recommend TV shows based on all writers' work who share the user's birth year)
function getBirthYearWriter(req, res) {
    let user_birthyear = parseInt(req.query.userBirthyear, 10);
    user_birthyear = isNaN(user_birthyear) ? 2000 : user_birthyear;

    if (req.query.isEnglish === "true") {
        connection.query(`
        SELECT DISTINCT  t.tid as tid, t.pTitle AS TV_Show, IP.name as Writer, "Add to WatchList" AS Watch
        FROM Titles t JOIN Writers w ON w.tid = t.tid JOIN IMDBPerson IP on IP.pid = w.pid JOIN AdditionalTitles A on t.tid = A.tid
        WHERE t.type LIKE '%tvseries%' AND IP.birthYear=${user_birthyear} AND A.language="en";;
        `, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    } else {
        connection.query(`
        SELECT DISTINCT  t.tid as tid, t.pTitle AS TV_Show, IP.name as Writer, "Add to WatchList" AS Watch
        FROM Titles t JOIN Writers w ON w.tid = t.tid JOIN IMDBPerson IP on IP.pid = w.pid
        WHERE t.type LIKE '%tvseries%' AND IP.birthYear=${user_birthyear};
        `, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    }
}

//Route 6 (function to recommend TV shows based on all actors' who share the user's birth year)
function getBirthYearShows(req, res) {
    let user_birthyear = parseInt(req.query.userBirthyear, 10);
    user_birthyear = isNaN(user_birthyear) ? 2000 : user_birthyear;

    if (req.query.isEnglish === "true") {
        connection.query(`
        WITH MIN AS (
            SELECT DISTINCT  t.tid
            FROM Titles t
            WHERE t.type LIKE '%tvseries%' AND t.startYear<=${user_birthyear}
        )
            SELECT M.tid as tid, t.pTitle AS TV_Show, t.startYear, t.endYear, "Add to WatchList" AS Watch
            FROM Titles t JOIN MIN M ON t.tid=M.tid JOIN AdditionalTitles A on t.tid = A.tid
            WHERE t.type LIKE '%tvseries%' AND t.endYear>=${user_birthyear} AND A.language="en";
        `, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    } else {
        connection.query(`
        WITH MIN AS (
            SELECT DISTINCT  t.tid
            FROM Titles t
            WHERE t.type LIKE '%tvseries%' AND t.startYear<=${user_birthyear}
        )
            SELECT M.tid as tid, t.pTitle AS TV_Show, t.startYear, t.endYear, "Add to WatchList" AS Watch
            FROM Titles t JOIN MIN M ON t.tid=M.tid
            WHERE t.type LIKE '%tvseries%' AND t.endYear>=${user_birthyear};
        `, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    }

}

//Route 7 (function to recommend TV shows that fall within the range of a users birth year)
function getBirthYearActor(req, res) {
    let user_birthyear = parseInt(req.query.userBirthyear, 10);
    user_birthyear = isNaN(user_birthyear) ? 2000 : user_birthyear;

    if (req.query.isEnglish === "true") {
        connection.query(`
        SELECT DISTINCT  t.tid as tid, t.pTitle AS TV_Show, IP.name as Actor, "Add to WatchList" AS Watch
        FROM Titles t JOIN Cast_In CI ON CI.tid = t.tid JOIN IMDBPerson IP on IP.pid = CI.pid JOIN AdditionalTitles A on t.tid = A.tid
        WHERE t.type LIKE '%tvseries%' AND IP.birthYear=${user_birthyear} AND A.language="en";
        `, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    } else {
        connection.query(`
        SELECT DISTINCT  t.tid as tid, t.pTitle AS TV_Show, IP.name as Actor, "Add to WatchList" AS Watch
        FROM Titles t JOIN Cast_In CI ON CI.tid = t.tid JOIN IMDBPerson IP on IP.pid = CI.pid
        WHERE t.type LIKE '%tvseries%' AND IP.birthYear=${user_birthyear};
        `, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    }

}

//Route 8 (function to recommend TV shows based on writers of a particular genre)
function getGenreTVWriter(req, res) {
    var genre = req.query.genre ? req.query.genre : "";
    connection.query(`
    WITH TVTitles AS (
        SELECT tid, pTitle
        FROM Titles
        WHERE type LIKE '%tvseries%'
    ), GenresList AS (
        SELECT T.tid
        FROM Titles T JOIN Genres G ON T.tid = G.tid
        WHERE type LIKE '%tvseries%' AND G.Genre LIKE '%${genre}%'
    ), WritersList AS (
        SELECT w.pid,  t.tid, t.pTitle
        FROM TVTitles t JOIN Writers w ON t.tid = w.tid
        WHERE t.tid IN (SELECT tid FROM GenresList)
        GROUP BY w.pid
    )
    SELECT DISTINCT WL.tid AS tid, WL.pTitle as TV_Show, IP.name as Writer, "Add to WatchList" AS Watch
    FROM WritersList WL JOIN IMDBPerson IP ON WL.pid = IP.pid
    ORDER BY TV_Show;   
    `, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

//Route 9 (function to recommend TV shows based on cast sizes of at least minSize)
function getCastSize(req, res) {
    let minSize = parseInt(req.query.minSize, 10);
    let maxSize = parseInt(req.query.maxSize, 10);
    minSize = isNaN(minSize) ? 0 : minSize;
    maxSize = isNaN(maxSize) ? 60: maxSize;
    connection.query(`
    WITH SizeCount AS (
        SELECT tid , COUNT(*) AS size
        FROM Cast_In
        GROUP BY tid
    )
    SELECT DISTINCT T.tid AS tid, T.pTitle as TV_Show, SC.size, "Add to WatchList" AS Watch
    FROM SizeCount SC JOIN Titles T on SC.tid = T.tid
    WHERE SC.size >= ${minSize} AND SC.size <=${maxSize}
    ORDER BY SC.size DESC; 
    `, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

//Route 10 (function to recommend TV shows based on a director involved in at least x-number (user input) of different TV shows within a specified rating range)
function directorInXShows(req, res) {
    const director = req.query.director ? req.query.director : "";
    let minSize = parseInt(req.query.minSize, 10);
    minSize = isNaN(minSize) ? 1 : minSize;
    connection.query(`
    WITH DirectorList AS (
        SELECT pid, COUNT(DISTINCT tid) AS numShows
        FROM Directors
        GROUP BY pid
        HAVING numShows >= ${minSize}
      ), DirectorsName AS (
          SELECT IP.name, DL.numShows, D.tid
          FROM IMDBPerson IP JOIN DirectorList DL ON IP.pid = DL.pid JOIN Directors D on IP.pid = D.pid
      )
        SELECT DISTINCT T.tid AS tid, DN.name AS Director, T.pTitle as TV_Show, DN.numShows, "Add to WatchList" AS Watch
        FROM Titles T JOIN DirectorsName DN ON T.tid=DN.tid
        WHERE DN.name LIKE "%${director}%"
        ORDER BY numShows DESC , name ASC;
    `, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

//Route 11 (function to recommend all TV shows)
function getAllShows(req, res) {
    connection.query(`
    SELECT DISTINCT T.tid as tid, T.pTitle as TV_Show, "Add to WatchList" AS Watch
    FROM Titles T
    ORDER BY TV_Show ASC;
    `, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

//Route 12 (function to recommend TV shows based on highest ratings)
function getShowsBasedOnRating(req, res) {
    let minRating = parseInt(req.query.minRating, 10);
    let maxRating = parseInt(req.query.maxRating, 10);
    minRating = isNaN(minRating) ? 0 : minRating;
    maxRating = isNaN(maxRating) ? 10: maxRating;
    connection.query(`
    SELECT DISTINCT T.tid as tid, T.pTitle as TV_Show, R.aveRating as Rating, "Add to WatchList" AS Watch
    FROM Titles T join Ratings R on T.tid = R.tid
    WHERE type LIKE '%tvseries%' AND R.aveRating>=${minRating} AND R.aveRating <=${maxRating}
    ORDER BY Rating DESC;
    `, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

//Route 13 (function to populate Watch List)
function getWatchList(req, res) {
    connection.query(`
    SELECT DISTINCT T.tid as tid, pTitle AS TV_Show, "Remove from WatchList" AS Remove
    FROM Titles T JOIN WatchList l ON T.tid = l.tid
    ORDER BY pTitle;
    `, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

//Route 14 (function to write to Watch List)
function addToWatchlist(req, res) {
    if (req.query.tid != "null") {
        connection.query(`
        INSERT INTO WatchList(tid)
        VALUES ("${req.query.tid}");
        `, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    }

}

//Route 15 (function to delete from Watch List)
function removeFromWatchlist(req, res) {
    if (req.query.tid != "null") {
        connection.query(`
        DELETE FROM WatchList
        WHERE tid = "${req.query.tid}";
        `, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    }
}

//Route 16 (function to clear all from Watch List)
function clearWatchList(req, res) {
    connection.query(`
    DELETE FROM WatchList;
    `, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}
module.exports = {
    userChoice,
    getTVRunTime,
    getLongestRunningTVShow,
    getBirthYearDirectorTV,
    getGenreTVWriter,
    getCastSize,
    directorInXShows,
    getAllShows,
    getShowsBasedOnRating,
    getBirthYearWriter,
    getBirthYearActor,
    getBirthYearShows,
    getWatchList,
    addToWatchlist,
    removeFromWatchlist,
    clearWatchList
}