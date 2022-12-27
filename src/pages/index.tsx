import type { NextPage } from 'next'
import { useState } from 'react'
import { PrefectureSelect } from 'src/components/PrefectureSelect'
import { Layout } from 'src/layout'

import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [prefectureCheckedList, setPrefectureCheckedList] = useState<number[]>(
    []
  )

  return (
    <Layout>
      <PrefectureSelect setPrefectureCheckedList={setPrefectureCheckedList} />
      <div>Hello</div>
    </Layout>
  )
}

export default Home
