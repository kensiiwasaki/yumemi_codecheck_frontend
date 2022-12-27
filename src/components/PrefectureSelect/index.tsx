import { Dispatch, FC, SetStateAction, useCallback, useState } from 'react'
import { Checkbox } from 'src/components/Atom/CheckBox'
import { usePrefectureData } from 'src/lib/hooks/usePrefectureData'

type PrefectureChoiceType = {
  setPrefectureCheckedList: Dispatch<SetStateAction<number[]>>
}

export const PrefectureSelect: FC<PrefectureChoiceType> = ({
  setPrefectureCheckedList,
}) => {
  const { prefData, prefDataError } = usePrefectureData()

  const handleChange = useCallback(
    (e: { prefCode: number; isChecked: boolean }) => {
      if (e.isChecked) {
        setPrefectureCheckedList((prevPrefectureCheckedList) => {
          return [...prevPrefectureCheckedList, e.prefCode]
        })
      } else {
        setPrefectureCheckedList((prevPrefectureCheckedList) => {
          return prevPrefectureCheckedList.filter((prefCode) => {
            return prefCode !== e.prefCode
          })
        })
      }
    },
    [setPrefectureCheckedList]
  )

  if (prefDataError instanceof Error) {
    return <div>{prefDataError.message}</div>
  }

  return (
    <div>
      <h2>都道府県</h2>
      <ul>
        {prefData &&
          prefData.map((prefecture) => {
            return (
              <li key={prefecture.prefCode}>
                <Checkbox
                  label={prefecture.prefName}
                  onChange={handleChange}
                  prefCode={prefecture.prefCode}
                />
              </li>
            )
          })}
      </ul>
    </div>
  )
}
