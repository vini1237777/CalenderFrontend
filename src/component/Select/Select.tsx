
import Select from 'react-select';

const BasicSelect= ({finalData,setFinalData}:any) => {

   const handleChange=(e:any)=>{
    setFinalData((prev:any)=>{return {...prev,priority:e}})
   }

    const options = [
      { value: "high", label: "High" },
      { value: "medium", label: "Medium" },
      { value: "low", label: "Low" },
    ];


  return (
    <>
      <Select
        className="basic-single"
        classNamePrefix="select"
        isClearable
        options={options}
        defaultValue={finalData.priority}
        onChange={handleChange}
      />
    </>
  );
}

export default BasicSelect;