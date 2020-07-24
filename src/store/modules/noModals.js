const state = {
}

const getters = {
}

const mutations = {
}

const actions = {
    watchLater(context, data) {
        context.dispatch('loading/startResponseWaiting', null, { root:true })
        const later = data.data.later_id > 0 ? null : 1
        context.dispatch('request/post', { url: `${process.env.VUE_APP_API_URL}/watchLater/${data.type}`, data: {
            obj_id: data.data.id,
            later: later
        } }, { root:true })
        .then(response => {
            data.boundedTo.forEach(boundedTo => {
                data.data.later_id = later
                context.commit(boundedTo, data.data, { root: true })
            })
        }).catch(error => {
        }).then(() => { context.dispatch('loading/finishResponseWaiting', null, { root:true }) })
    },
    ban(context, data) {
        context.dispatch('loading/startResponseWaiting', null, { root:true })
        const ban = data.data.ban_id > 0 ? null : 1
        context.dispatch('request/post', { url: `${process.env.VUE_APP_API_URL}/ban/${data.type}`, data: {
            obj_id: data.data.id,
            ban: ban
        } }, { root:true })
        .then(response => {
            data.boundedTo.forEach(boundedTo => {
                data.data.ban_id = ban
                context.commit(boundedTo, data.data, { root: true })
            })
        }).catch(error => {
        }).then(() => { context.dispatch('loading/finishResponseWaiting', null, { root:true }) })
    },
    vote(context, data) {
        context.dispatch('loading/startResponseWaiting', null, { root:true })
        return new Promise((resolve, reject) => {
            context.dispatch('request/post', { url: `${process.env.VUE_APP_API_URL}/rate/${data.type}`, data: {
                obj_id: data.data.id,
                rate_code: data.vote
            } }, { root:true })
            .then(response => {
                if(data.boundedTo) data.boundedTo.forEach(boundedTo => {
                    data.data.ban_id = ban
                    context.commit(boundedTo, data.data, { root: true })
                })
                resolve(response)
            }).catch(error => {
                reject(error)
            }).then(() => { context.dispatch('loading/finishResponseWaiting', null, { root:true }) })
        })
    },
    getUserReview(context, data) {
        return new Promise((resolve, reject) => {
            context.dispatch('request/get', `${process.env.VUE_APP_API_URL}/getUserReview/${data.type}/${data.data.id}`, { root:true })
            .then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    sendReview(context, data) {
        context.dispatch('loading/startResponseWaiting', null, { root:true })
        return new Promise((resolve, reject) => {
            context.dispatch('request/post', { url: `${process.env.VUE_APP_API_URL}/sendReview/${data.type}`, data: {
                obj_id: data.data.id,
                review: data.review
            } }, { root:true })
            .then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            }).then(() => { context.dispatch('loading/finishResponseWaiting', null, { root:true }) })
        })
    },
    likeReview(context, data) {
        context.dispatch('loading/startResponseWaiting', null, { root:true })
        const isLike = data.data.is_liked == 1 ? 0 : 1
        return new Promise((resolve, reject) => {
            context.dispatch('request/post', { url: `${process.env.VUE_APP_API_URL}/likeReview`, data: {
                review_id: data.data.id,
                is_liked: isLike
            } }, { root:true })
            .then(response => {
                if(data.boundedTo) data.boundedTo.forEach(boundedTo => {
                    data.data.is_liked = isLike
                    context.commit(boundedTo, data.data, { root: true })
                })
                resolve(response)
            }).catch(error => {
                reject(error)
            }).then(() => { context.dispatch('loading/finishResponseWaiting', null, { root:true }) })
        })
    },
    lastSeen(context, data) {
        context.dispatch('loading/startResponseWaiting', null, { root:true })
        const lastSeen = data.data.seen_id > 0 && data.data.last_seen_episode_number === data.lastSeenData.last_seen_episode && data.data.last_seen_season_number === data.lastSeenData.last_seen_season ? null : 1
        context.dispatch('request/post', { url: `${process.env.VUE_APP_API_URL}/lastSeen`, data: {
            series_id: data.data.id,
            last_seen: lastSeen,
            last_seen_episode: data.lastSeenData.last_seen_episode,
            last_seen_season: data.lastSeenData.last_seen_season,
            next_episode: data.lastSeenData.next_episode,
            next_season: data.lastSeenData.next_season,
            air_date: data.lastSeenData.air_date
        } }, { root:true })
        .then(response => {
            data.boundedTo.forEach(boundedTo => {
                data.data.seen_id = lastSeen
                data.data.last_seen_episode_number = data.lastSeenData.last_seen_episode
                data.data.last_seen_season_number = data.lastSeenData.last_seen_season
                context.commit(boundedTo, data.data, { root: true })
            })
        }).catch(error => {
        }).then(() => { context.dispatch('loading/finishResponseWaiting', null, { root:true }) })
    },
    follow(context, data) {
        context.dispatch('loading/startResponseWaiting', null, { root:true })
        const follow = data.data.following_id > 0 ? null : 1
        context.dispatch('request/post', { url: `${process.env.VUE_APP_API_URL}/follow`, data: {
            obj_id: data.data.obj_id,
            follow: follow
        } }, { root:true })
        .then(response => {
            data.data.following_id = follow
            data.boundedTo.forEach(boundedTo => {
                context.commit(boundedTo, data.data, { root: true })
            })
        }).catch(error => {
        }).then(() => { context.dispatch('loading/finishResponseWaiting', null, { root:true }) })
    },
    getNotified(context, data) {
        context.dispatch('loading/startResponseWaiting', null, { root:true })
        const notifiedBy = data.data.notified_by_id > 0 ? null : 1
        context.dispatch('request/post', { url: `${process.env.VUE_APP_API_URL}/notifiedBy/${data.type}`, data: {
            obj_id: data.data.obj_id,
            notified_by: notifiedBy
        } }, { root:true })
        .then(response => {
            data.data.notified_by_id = notifiedBy
            data.boundedTo.forEach(boundedTo => {
                context.commit(boundedTo, data.data, { root: true })
            })
        }).catch(error => {
        }).then(() => { context.dispatch('loading/finishResponseWaiting', null, { root:true }) })
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}