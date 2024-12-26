import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { addDays } from 'date-fns';
import { useState } from 'react';

const Test = () => {
    const [state, setState] = useState({
        selection: {
          startDate: new Date(),
          endDate: null,
          key: 'selection'
        }
      });
      
    return (
        <DateRangePicker
        onChange={item => setState({ ...state, ...item })}
        months={1}
        minDate={addDays(new Date(), -30)}
        maxDate={addDays(new Date(), 30)}
        direction="vertical"
        scroll={{ enabled: true }}
        ranges={[state.selection, state.compare]}
      />
    )
}

export default Test


