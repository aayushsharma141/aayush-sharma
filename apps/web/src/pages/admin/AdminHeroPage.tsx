import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { api, HeroContent } from "@/lib/api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const AdminHeroPage = () => {
  const { register, handleSubmit, reset, formState } = useForm<HeroContent>({
    defaultValues: {
      badgeText: "Premier Interior Design Studio",
      headlineLine1: "Elevate Your Space",
      headlineLine2: "Into Luxury",
      subtitle:
        "Transforming your vision into exquisite living spaces with innovative and personalized interior design solutions.",
    },
  });

  useEffect(() => {
    let isMounted = true;
    api
      .getHeroContent()
      .then((data) => {
        if (isMounted) {
          reset(data);
        }
      })
      .catch(() => {
        toast.error("Unable to load hero content from Strapi. Using defaults.");
      });
    return () => {
      isMounted = false;
    };
  }, [reset]);

  const onSubmit = async (values: HeroContent) => {
    try {
      await api.updateHeroContent(values);
      toast.success("Hero content updated");
    } catch (error) {
      toast.error("Failed to update hero content");
      console.error(error);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-3xl font-bold">Hero Section</h1>
      <p className="text-sm text-muted-foreground">
        Manage the main hero text shown on the homepage. Changes are saved in Strapi so you can edit copy without
        deploying code.
      </p>
      <Card>
        <CardHeader>
          <CardTitle>Hero Text Content</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="badgeText">Badge Text</Label>
              <Input id="badgeText" {...register("badgeText")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="headlineLine1">Headline Line 1</Label>
              <Input id="headlineLine1" {...register("headlineLine1")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="headlineLine2">Headline Line 2</Label>
              <Input id="headlineLine2" {...register("headlineLine2")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtitle</Label>
              <Textarea id="subtitle" rows={4} {...register("subtitle")} />
            </div>
            <Button type="submit" disabled={formState.isSubmitting}>
              {formState.isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminHeroPage;

