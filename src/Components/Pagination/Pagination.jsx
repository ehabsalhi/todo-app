
import { useContext, useEffect, useState } from 'react';
import { Pagination , Group } from '@mantine/core';
import { settingsProvider } from '../../context/settings/settings';

export default function Demo() {
     const [activePage, setPage] = useState(1);
     const number = useContext(settingsProvider)
     let localStorageData = JSON.parse(localStorage.getItem('settings'))

     let total = Math.ceil(number.state.length / (localStorageData?.itemsPerPage || 3))
     // let total = Math.ceil(number.state.length / number.settings.itemsPerPage)


     
     useEffect(() => {
          number.change(activePage)
     },[activePage , number.state])
     
  return <Pagination value={activePage} onChange={setPage}  total={total} className='pagination' />;
}

