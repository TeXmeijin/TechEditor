export const CheckBoxWithLabel = (props) => {
  return (
    <>
      <input
        checked={props.value}
        onChange={props.onChange}
        type="checkbox"
        name={props.name}
        id={props.name}
      />
      <label htmlFor={props.name}>{props.label}</label>
    </>
  );
};
