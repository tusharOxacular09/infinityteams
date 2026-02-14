import { Check, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const comparisonData = [
  {
    feature: "Full-time employees",
    infinityTeams: true,
    outsourcing: true,
    freelance: false,
  },
  {
    feature: "Real salary visibility",
    infinityTeams: true,
    outsourcing: false,
    freelance: false,
  },
  {
    feature: "Cost-plus pricing",
    infinityTeams: true,
    outsourcing: false,
    freelance: false,
  },
  {
    feature: "Managed HR & payroll",
    infinityTeams: true,
    outsourcing: true,
    freelance: false,
  },
  {
    feature: "Long-term stability",
    infinityTeams: true,
    outsourcing: false,
    freelance: false,
  },
];

const CheckIcon = () => (
  <div className="flex justify-center">
    <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
      <Check className="w-5 h-5 text-success" />
    </div>
  </div>
);

const XIcon = () => (
  <div className="flex justify-center">
    <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center">
      <X className="w-5 h-5 text-destructive" />
    </div>
  </div>
);

export const ComparisonSection = () => {
  return (
    <section className="section-spacing bg-muted/30">
      <div className="container-hero">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Infinity Teams vs Others
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how we compare to traditional outsourcing firms and freelance platforms
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-lg">
            <Table>
              <TableHeader>
                <TableRow className="bg-primary/5 hover:bg-primary/5">
                  <TableHead className="w-[200px] font-semibold text-foreground py-5">
                    Feature
                  </TableHead>
                  <TableHead className="text-center font-semibold py-5">
                    <span className="text-primary font-bold">Infinity Teams</span>
                  </TableHead>
                  <TableHead className="text-center font-semibold text-foreground py-5">
                    Outsourcing Firms
                  </TableHead>
                  <TableHead className="text-center font-semibold text-foreground py-5">
                    Freelance Platforms
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonData.map((row, index) => (
                  <TableRow 
                    key={row.feature}
                    className={index % 2 === 0 ? "bg-background" : "bg-muted/20"}
                  >
                    <TableCell className="font-medium text-foreground py-5">
                      {row.feature}
                    </TableCell>
                    <TableCell className="py-5">
                      {row.infinityTeams ? <CheckIcon /> : <XIcon />}
                    </TableCell>
                    <TableCell className="py-5">
                      {row.outsourcing ? <CheckIcon /> : <XIcon />}
                    </TableCell>
                    <TableCell className="py-5">
                      {row.freelance ? <CheckIcon /> : <XIcon />}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <p className="text-center text-muted-foreground mt-8 text-sm">
            * Infinity Teams combines the best of both worlds: dedicated full-time employees with complete cost transparency
          </p>
        </div>
      </div>
    </section>
  );
};
