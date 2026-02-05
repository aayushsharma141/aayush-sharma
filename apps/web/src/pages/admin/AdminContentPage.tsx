import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type AdminContentPageProps = {
  title: string;
  description?: string;
};

const AdminContentPage = ({ title, description }: AdminContentPageProps) => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{title}</h1>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {description ||
              "This admin section is ready for content management integration. You can configure this page to manage the corresponding section of your website using Strapi."}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminContentPage;

