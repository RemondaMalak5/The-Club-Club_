import React from 'react'
import News_component from '../Component/News_component/News_component'
import All_News from '../Component/News_component/All_News'
import Search_News from '../Component/News_component/Search_News'

const News = () => {
  return (
    <div>
      <News_component />
      <Search_News/>
      <All_News/>
    </div>
  )
}

export default News
