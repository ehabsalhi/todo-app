import { useForm } from '@mantine/form';
import { NumberInput, TextInput, Button, Box  ,Switch} from '@mantine/core';
import { useContext, useEffect } from 'react';
import { settingsProvider } from '../../context/settings/settings';

export default function SettingsPage() {     
  const form = useForm({
    initialValues: { itemsPerPage: 3, difficulty: 0 , showCompleted : true },
  });
  const context = useContext(settingsProvider)

  function Handelsettings() {
    context.setSettings(form.values)
    localStorage.setItem('settings', JSON.stringify(form.values))
  }
  let localStorageData = JSON.parse(localStorage.getItem('settings'))

  console.log(context.settings);


  return (
    <>
      <div className='settings-cont'>

        <div className='underHeader'>
          <h3>Manage Settings</h3>
        </div>

        <div className="box-cont">
        <Box maw={320} mx="auto" className='box'>
              <form onSubmit={form.onSubmit(Handelsettings)}>
                <Switch label="show Completed Items" {...form.getInputProps('showCompleted', { type: 'checkbox' })}/>
                
              <TextInput label="sort keyword" placeholder="sort keyword" {...form.getInputProps('difficulty')} />
              <NumberInput
                  mt="sm"
                  label="Items per page"
                  min={0}
                  max={99}
                  {...form.getInputProps('itemsPerPage')}
              />
              <Button type="submit" mt="sm">
                  Save
              </Button>
            </form>
          </Box>

          <div className="card">
            <h2>Updated Settings</h2>
            <p>show Completed Items : {`${localStorageData?.showCompleted || 'true' }`}</p>
            <p>Items per page :  {localStorageData?.itemsPerPage || 3}</p>
            <p>sort keyword : {localStorageData?.difficulty || ''}</p>
          </div>

        </div>
        
      </div>
      </>

  );
}