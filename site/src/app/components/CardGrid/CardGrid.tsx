import { Card } from "../common";

const CardGrid: React.FC<{}> = () => {
    return (
        <section className="grid grid-cols-2 gap-4 main-container">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </section>
    );
};

export default CardGrid;