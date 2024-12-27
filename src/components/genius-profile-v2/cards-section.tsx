import { Card, CardContent } from "@/src/ui/card";
import { BadgeIcon as IdCard } from "lucide-react";

const CardsSection = () => {
  const cards = [
    { id: 1, title: "Card 1", description: "Description of card 1" },
    { id: 2, title: "Card 2", description: "Description of card 2" },
    { id: 3, title: "Card 3", description: "Description of card 3" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map((card) => (
        <Card key={card.id}>
          <CardContent className="p-6 flex items-center gap-4">
            <IdCard className="h-8 w-8 text-amber-500" />
            <div>
              <h3 className="font-semibold">{card.title}</h3>
              <p className="text-sm text-muted-foreground">
                {card.description}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CardsSection;
