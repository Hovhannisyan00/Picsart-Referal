type LayoutType = {
  title: string;
};

function Cube({ title }: LayoutType) {
  return <div>{title}</div>;
}

export default Cube;
