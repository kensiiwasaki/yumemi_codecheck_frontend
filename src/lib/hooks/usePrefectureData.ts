import { useCallback, useEffect, useState } from 'react'
import { PrefectureData } from 'src/lib/type/prefectureData'

export const usePrefectureData = () => {
  const [prefData, setPrefData] = useState<PrefectureData[]>([])
  const [prefDataError, setPrefDataError] = useState<unknown>()

  const getPrefectureData = useCallback(async () => {
    try {
      const prefectureDataApi = await fetch('/api/prefectureAPI')
      if (!prefectureDataApi.ok) {
        throw new Error('都道府県データの取得に失敗しました')
      }
      const prefectureDataJson = await prefectureDataApi.json()
      setPrefData(prefectureDataJson.result)
    } catch (error: unknown) {
      if (error instanceof Error) {
        setPrefDataError(error)
      }
    }
  }, [])

  useEffect(() => {
    getPrefectureData()
  }, [getPrefectureData])

  return {
    prefData,
    prefDataError,
    getPrefectureData,
  }
}
