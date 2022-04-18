import {  useState } from 'react';
import { Field, Formik, Form } from "formik";
import { Grid, Button, Chip } from "@material-ui/core";
import { EntryWithoutId, EntryType, Diagnosis, HealthCheckRating, BaseEntry } from '../../types';
import { TextField, SelectField, SelectOption, NumberField } from "../../components/FormField";
// npm packacage (I'm the creator):
import InputSelect, {MenuItemType}  from 'react-material-selectable-inputtext'; 
import { useStateValue } from '../../state';

interface Props {
  onSubmit: (values: EntryWithoutId) => void;
  onCancel: () => void;
}

const entryTypesOptions: SelectOption<EntryType>[] = [
  { value: EntryType.HealthCheck, label: "Health Check" },
  { value: EntryType.Hospital, label: "Hospital" },
  { value: EntryType.OccupationalHealthcare, label: "OccupationalHealthcare" },
];

interface FormikTypeHosp extends BaseEntry {
  type: EntryType.Hospital;
  dischargeDate: string;
  dischargeCriteria: string;
}

interface FormikTypeHealthCheck extends BaseEntry {
  type: EntryType.HealthCheck;
  healthCheckRating: number;
}

interface FormikTypeOcupational extends BaseEntry {
  type: EntryType.OccupationalHealthcare;
  employerName: string;
  sickStartDate?: string;
  sickEndDate?: string;
}
interface FormikTypeAll extends BaseEntry {
  type: EntryType.None;
  dischargeDate: string;
  dischargeCriteria: string;
  healthCheckRating: number;
  employerName: string;
  sickStartDate?: string;
  sickEndDate?: string;
}

type FormikType = | FormikTypeHosp | FormikTypeHealthCheck | FormikTypeOcupational | FormikTypeAll;


const parseDiagnosisMenuItem = (item: Diagnosis): MenuItemType => {
  return {
    id: item.code,
    text: item.name
  };
};

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {

  const [state] = useStateValue();
  const [selected, setSelected] = useState<MenuItemType[]>([]);
  const [healthCheckRat, setHealthCheckRat] = useState(0);

  const onAddHandler = (item: MenuItemType): void => {
    setSelected([...selected, item]);
  };
  const handleDelete = (item: MenuItemType): void => {
    setSelected(st => st.filter(s => s.id !== item.id));
  };

  const handleSubmit = (values: FormikType): void => {
    if(values.type === EntryType.HealthCheck){
      onSubmit({...values, diagnosisCodes: selected.map(s => s.id as string), healthCheckRating: healthCheckRat });
    }else if(values.type === EntryType.Hospital){
      const discharge = {
        date: values.dischargeDate,
        criteria: values.dischargeCriteria
      };
      onSubmit({...values, diagnosisCodes: selected.map(s => s.id as string), discharge: discharge });
    } else if(values.type === EntryType.OccupationalHealthcare){
      const sickLeave = (values.sickStartDate !== "" && values.sickEndDate !== "") ? {
        startDate : values.sickStartDate as string,
        endDate: values.sickEndDate as string
      } : undefined;
      onSubmit({...values, diagnosisCodes: selected.map(s => s.id as string), sickLeave: sickLeave});
    }
  };

  return (
    <Formik
      initialValues={{
        type: EntryType.None,
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: undefined,

        healthCheckRating: HealthCheckRating.LowRisk,
        dischargeDate: "",
        dischargeCriteria: "",
        employerName: "",
        sickEndDate: "",
        sickStartDate: ""
        }
      }
      onSubmit={handleSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }

        if(values.type === EntryType.HealthCheck){
          if(!values.healthCheckRating){
            errors.healthCheckRating = requiredError;
          }
        }else if(values.type === EntryType.OccupationalHealthcare){
          if(!values.employerName){
            errors.employerName = requiredError;
          }
        }else if(values.type === EntryType.Hospital){
          if(!values.dischargeDate){
            errors.sickEndDate = requiredError;
          }
          if(!values.dischargeCriteria){
            errors.dischargeCriteria = requiredError;
          }
        }else if(values.type === EntryType.None){
          errors.type = requiredError;
        }

        return errors;
      }}
    >
      {({isValid, dirty, setFieldValue:_setFieldValue, setFieldTouched: _setFieldTouched, values}) => {
        return (
          <Form className="form ui">
            <SelectField label="Type" name="type" options={entryTypesOptions} />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <InputSelect
              optionsList={state.diagnosis.map(parseDiagnosisMenuItem)}
              excludedOptions={selected}
              onAdd={onAddHandler}
              textFieldProps={{
                variant: "outlined",
                fullWidth: true,
                name:"diagnosis"
              }}
            />
            {selected.map(item =>
              <Chip
                key={item.text}
                label={item.text}
                onDelete={() => handleDelete(item)}
                style={{ margin: '4px' }}
              />
            )}

            {values.type === EntryType.HealthCheck && 
              <Field
                label="Health Check Rating"
                min={0}
                max={3}
                value={healthCheckRat}
                setValue={setHealthCheckRat}
                name="healthCheckRating"
                component={NumberField}
              />
            }
            {values.type === EntryType.Hospital && 
              <>
                <Field
                  label="Discharge Date"
                  placeholder="YYYY-MM-DD"
                  name="dischargeDate"
                  component={TextField}
                />
                <Field
                  label="Discharge Criteria"
                  placeholder="Criteria"
                  name="dischargeCriteria"
                  component={TextField}
                />
              </>
            }
            {values.type === EntryType.OccupationalHealthcare && 
              <>
                <Field
                  label="Employer"
                  placeholder="Name"
                  name="employerName"
                  component={TextField}
                />
                <Field
                  label="Sick Start Date"
                  placeholder="YYYY-MM-DD"
                  name="sickStartDate"
                  component={TextField}
                />
                <Field
                  label="Sick End Date"
                  placeholder="YYYY-MM-DD"
                  name="sickEndDate"
                  component={TextField}
                />
              </>
            }

            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;