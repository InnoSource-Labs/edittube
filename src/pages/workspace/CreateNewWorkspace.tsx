import { InputLabel, TextField } from '@mui/material'
import { ReactNode, useState } from 'react'
import LoadingButton from '@mui/lab/LoadingButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditorsSelector from '../../components/EditorsSelctor';
import { editorsInterface } from '../../models/workspace';

const CreateNewWorkSpace = (): ReactNode => {

  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [clientID, setclientID] = useState<string>("");
  const [clientSecret, setClientSecret] = useState<string>("");
  const [editors, setEditors] = useState<editorsInterface[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    console.log(name, clientID, clientSecret, editors)
    setLoading(false)
  }

  return (
    <div className='flex items-center justify-center m-4'>
      <form onSubmit={handleSubmit} className='shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-[500px] flex items-center justify-center px-8 py-4 flex-col'>
        <div className='mb-8 font-semibold text-2xl font-sans'>
          Create new workspace
        </div>
        <div className='mb-4 w-full'>
          <InputLabel htmlFor="name">Name: </InputLabel>
          <TextField
            required
            id="outlined-required name"
            label="Required"
            size='small'
            sx={{ width: "100%" }}
            value={name}
            onChange={(e) => { setName(e.target.value) }}
          />
        </div>
        <div className='text-sm text-blue-500 my-2'><a href="https://support.google.com/cloud/answer/6158849?hl=en">Click here and follow the steps to generate Client ID and Secret</a></div>
        <div className='mb-4 w-full'>
          <InputLabel htmlFor="clientID">Client ID: </InputLabel>
          <TextField
            required
            id="outlined-required clientID"
            label="Required"
            size='small'
            sx={{ width: "100%" }}
            value={clientID}
            onChange={(e) => { setclientID(e.target.value) }}
          />
        </div>
        <div className='mb-4 w-full'>
          <InputLabel htmlFor="clientsecret">Client Secret: </InputLabel>
          <TextField
            required
            id="outlined-required clientsecret"
            label="Required"
            size='small'
            sx={{ width: "100%" }}
            value={clientSecret}
            onChange={(e) => { setClientSecret(e.target.value) }}
          />
        </div>
        <EditorsSelector intialVal={editors} onValChange={setEditors} />
        <LoadingButton
          loading={loading}
          endIcon={<AddBoxIcon />}
          loadingPosition="end"
          variant="contained"
          type="submit"
        >
          <span>Create Workspace</span>
        </LoadingButton>
      </form>
    </div>
  )
}

export default CreateNewWorkSpace