import { Card } from "../common";

const CardGrid: React.FC<{}> = () => {
    return (
        <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
    );
};

export default CardGrid;