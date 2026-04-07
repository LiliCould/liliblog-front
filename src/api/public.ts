import request from '@/utils/request'
import type { ApiResponse } from '@/types/api.d'
import type { Article } from '@/types/article.d'
import type { PageParams } from '@/types/common.d'

export function getPublicArticles(params?: PageParams) {
    return request.get<ApiResponse<Article[]>>('/api/public/articles', { params })
}

export function getPublicArticleById(id: number) {
    return request.get<ApiResponse<Article>>(`/api/public/article/${id}`)
}

export function getPublicArticleBySlug(slug: string) {
    return request.get<ApiResponse<Article>>(`/api/public/article/slug/${slug}`)
}

export function searchArticles(keyword: string) {
    return request.get<ApiResponse<Article[]>>('/api/public/search', {
        params: { keyword },
    })
}

export function getChatMessages(beforeId?: number) {
    return request.get<ApiResponse<any[]>>('/api/chat/messages', {
        params: { beforeId },
    })
}

export function updateChatRead() {
    return request.post<ApiResponse<boolean>>('/api/chat/read')
}

export function getChatUnreadCount() {
    return request.get<ApiResponse<number>>('/api/chat/unread-count')
}
