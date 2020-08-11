const { RESTDataSource } = require('apollo-datasource-rest');

class ShowAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = "http://api.tvmaze.com/";
    }

    showReducer(show) {
        return {
            id: show.id || 0,
            name: show.name,
            genres: show.genres,
            premiered: show.premiered,
            medium: show.image != null ? show.image.medium : null,
            original: show.image != null ? show.image.original : null,
            rating: show.rating.average,
            summary: show.summary
        }
    }

    detailedShowReducer(show) {
        var seasons = Array.isArray(show._embedded.seasons) ? show._embedded.seasons.map(season => this.seasonReducer(season)) : [];
        var episodes = Array.isArray(show._embedded.episodes) ? show._embedded.episodes.map(episode => this.episodeReducer(episode)) : [];
        var crew = Array.isArray(show._embedded.crew) ? show._embedded.crew.map(crew => this.crewReducer(crew)) : [];

        return {
            id: show.id || 0,
            name: show.name,
            genres: show.genres,
            premiered: show.premiered,
            medium: show.image != null ? show.image.medium : null,
            original: show.image != null ? show.image.original : null,
            rating: show.rating.average,
            summary: show.summary,
            seasons: seasons,
            episodes: episodes,
            crew: crew
        }
    }

    seasonReducer(season) {
        return {
            id: season.id,
            number: season.number,
            episodes: season.episodeOrder
        }
    }

    episodeReducer(episode) {
        return {
            id: episode.id,
            name: episode.name,
            airdate: episode.airdate,
            airstamp: episode.airstamp,
            airtime: episode.airtime,
            summary: episode.summary,
        }
    }

    crewReducer(crew){
        return {
            type: crew.type,
            person: {
                id: crew.person.id,
                name: crew.person.name,
                medium: crew.person.image != null ? crew.person.image.medium : null,
                original: crew.person.image != null ? crew.person.image.original : null,
            }
        }
    }

    async getAllShows({page}) {
        const response = await this.get(`shows?page=${page}`);
        return Array.isArray(response) ? response.map(show => this.showReducer(show)) : [];
    }

    async getShowsByName({ name }) {
        const response = await this.get(`/search/shows?q=${name}`);
        return Array.isArray(response) ? response.map(show => this.showReducer(show.show)) : [];
    }

    async getShowById({ showId }) {
        const response = await this.get(`shows/${showId}?embed[]=episodes&embed[]=seasons&&embed[]=cast`);
        return this.detailedShowReducer(response);
    }

    getFavorites({ showIds }) {
        return Promise.all(showIds.map(showId => this.getShowById({ showId })));
    }

    getScheduled({ showIds }) {
        return Promise.all(showIds.map(showId => this.getShowById({ showId })));
    }
}

module.exports = ShowAPI;