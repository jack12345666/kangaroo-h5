import { createContent, getOpencontentByTid, getMycontentByTid, getAllOpenContent, getMyMarkContent, getMySaveContent, getContentById, getCommentById, getMarkById,getSaveById, addComment, isMarkContent,isSaveContent, markSign, saveSign, getcontentCountByUid, getSaveByUid, getMarkByUid, isDelContent,getcontentByUid } from '../../api/content'

const state = {
    sendData: {
        context: '',
        theme: '',
        tid: null,
        is_comment: false,
        isOpen: false,
    },
    contentList: [],
    content_id: null,
    is_comment: null,
    saveList: [],
    markList: [],
    commentList: [],
    saveCount: 0,
    markCount: 0,
    commentCount: 0,
    isMark: false,
    isSave: false,
    authorId: null,
   // scrollTop: 0,
   uploadImg: null,
   uploadVideo: null,
   uploadAudio: null,
   type: 9, // 我的内容 类型
}

const actions = {
   async createContent(_, params) {
       return await createContent(params)
   },
   async getOpencontentByTid(_, tid) {
      return  await getOpencontentByTid(tid)
   },
   async getMycontentByTid(_, tid) {
      return  await getMycontentByTid(tid)
   },
   async getAllOpenContent(_, limitCount) {
       return await getAllOpenContent(limitCount)
   },
   async getMyMarkContent() {
       return await getMyMarkContent()
   },
   async getMySaveContent() {
       return await getMySaveContent()
   },
   async getContentById(_, id) {
       return await getContentById(id)
   },
   async getCommentById({commit}, id) {
       let rsp = await getCommentById(id) 
       if(rsp.code === 200) {
           commit('changeCommentList', rsp)
       }
       return rsp;
   },
   async getMarkById({commit}, id) {
       let rsp = await getMarkById(id)
       if(rsp.code === 200) {
           commit('changeMarkList', rsp)
       }
       return rsp
   },
   async getSaveById({commit}, id) {
       let rsp = await getSaveById(id)
       if(rsp.code === 200) {
           commit('changeSaveList', rsp)
       }
       return rsp;
   },
   async addComment({dispatch,state}, params) {
     let rsp = await  addComment(params)
     if(rsp.code === 200) {
        dispatch('getCommentById',state.content_id)
     }
     return rsp;
   },
   async isMarkContent({dispatch,state}, params) {
       let rsp = await isMarkContent(params)
       if(rsp.code === 200) {
            dispatch('getMarkById',state.content_id) 
       }
       return rsp;  
   },
   async isSaveContent({dispatch,state}, params) {
       let rsp = await isSaveContent(params)
       if(rsp.code === 200) {
           dispatch('getSaveById', state.content_id)
       }
       return rsp;
   },
   async markSign({commit}, cid) {
       let rsp = await markSign(cid)
       if(rsp.code === 200) {
            commit('isMark', rsp.sign)
       }
       return rsp;
   },
   async saveSign({commit}, cid) {
       let rsp = await saveSign(cid)
       if(rsp.code === 200) {
           commit('isSave', rsp.sign)
       }
       return rsp;
   },
   async getcontentCountByUid() {
       return await getcontentCountByUid()
   },
   async getSaveByUid() {
       return await getSaveByUid()
   },
   async getMarkByUid() {
       return await getMarkByUid()
   },
   async isDelContent({dispatch,state}, params) {
       let rsp = await isDelContent(params)
       if(rsp.code === 200) {
           dispatch('getMycontentByTid', state.content_id)
       }
       return rsp;
   },
   async getcontentByUid(_,status) {
       return await getcontentByUid(status)
   }
}

const mutations = {
    changeSendData(state, payload) {
        state.sendData = payload
    },
    changeContentId(state, payload) {
        state.content_id = payload
    },
    changeIsComment(state, payload) {
        state.is_comment = payload 
    },
    changeCommentList(state, payload) {
        state.commentList = payload.list
        state.commentCount = payload.count
    },
    changeMarkList(state, payload) {
        state.markList = payload.list
        state.markCount = payload.count
    },
    changeSaveList(state, payload) {
        state.saveList = payload.list
        state.saveCount = payload.count
    },
    isMark(state, payload) {
        state.isMark = payload
    },
    isSave(state, payload) {
        state.isSave = payload
    },
    changeAuthorId(state, payload) {
        state.authorId = payload
    },
    changeUploadImg(state, payload) {
        state.uploadImg = payload
    },
    changeUploadVideo(state, payload) {
        state.uploadVideo = payload
    },
    changeUploadAudio(state, payload) {
        state.uploadAudio = payload
    },
    changeType(state, payload) {
        state.type = payload
    }
    // changeScrollTop(state, payload) {
    //     state.scrollTop = payload
    // }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}