import FormControls from "./form-controls";
import { Button } from "../ui/button";
function CommonForm({
    handleSubmit,
    ButtonText,
    formControls = [],
    formData, 
    setFormData,
    isButtonDisabled=false

}) {
    return (
        <form onSubmit={handleSubmit}>
            {/**render form controls here */}
            <FormControls formControls={formControls} formData={formData}  setFormData={setFormData} />
            <Button disabled={isButtonDisabled} type="submit">{ButtonText || 'Submit'}</Button>
        </form>

    );
    
}

export default CommonForm;