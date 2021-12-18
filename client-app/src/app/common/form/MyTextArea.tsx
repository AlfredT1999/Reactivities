import { useField } from 'formik';
import { Form, Label } from 'semantic-ui-react';

interface Props
{
    placeholder: string;
    name: string;
    rows: number;
    label?: string;
}

export default function MyTextArea(props: Props)
{
    // Meta: An object containing metadata (i.e. value , touched , error , and initialValue )
    const [field, meta] = useField(props.name);

    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <textarea {...field} {...props} />
            {meta.touched && meta.error ? (<Label basic color='red'>{meta.error}</Label>) : null}
        </Form.Field>
    );
}