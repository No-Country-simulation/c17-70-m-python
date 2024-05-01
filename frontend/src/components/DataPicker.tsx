import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function BasicDatePicker () {
  const handleChangeDate = (evenet: dayjs.Dayjs | null) => {
    console.log(evenet?.format('YYYY-MM-DD'))
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker onChange={handleChangeDate} label="Cumpleaños" />
      </DemoContainer>
    </LocalizationProvider>
  )
}