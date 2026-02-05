import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { useProjects } from "@/context/ProjectContext";
import { Project } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Trash2, Plus } from "lucide-react";

const AdminProjectEditor = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { projects, addProject, updateProject } = useProjects();
  const isEditing = !!slug;

  const { register, control, handleSubmit, reset, setValue } = useForm<Project>({
    defaultValues: {
      id: crypto.randomUUID(),
      gallery: [{ room: "Main", images: [""] }],
      materials: [{ name: "", details: "" }],
      year: new Date().getFullYear(),
    }
  });

  const { fields: materialFields, append: appendMaterial, remove: removeMaterial } = useFieldArray({
    control,
    name: "materials"
  });

  // Simplified gallery handling for now - assuming one gallery item for simplicity in MVP
  // In a real app, this would be a more complex component
  
  useEffect(() => {
    if (isEditing && slug) {
      const project = projects.find(p => p.slug === slug);
      if (project) {
        reset(project);
      } else {
        toast.error("Project not found");
        navigate("/admin/projects");
      }
    }
  }, [isEditing, slug, projects, reset, navigate]);

  const onSubmit = async (data: Project) => {
    try {
      if (isEditing) {
        await updateProject(data.id, data);
        toast.success("Project updated successfully");
      } else {
        const { id, ...rest } = data;
        await addProject(rest);
        toast.success("Project created successfully");
      }
      navigate("/admin/projects");
    } catch (error) {
      toast.error("An error occurred");
      console.error(error);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{isEditing ? "Edit Project" : "New Project"}</h1>
        <Button variant="outline" onClick={() => navigate("/admin/projects")}>
          Cancel
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" {...register("title", { required: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug (URL)</Label>
              <Input id="slug" {...register("slug", { required: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="client">Client</Label>
              <Input id="client" {...register("client")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" {...register("location")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <select 
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                {...register("type")}
              >
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input id="category" {...register("category")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="area">Area</Label>
              <Input id="area" {...register("area")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget">Budget</Label>
              <Input id="budget" {...register("budget")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input id="duration" {...register("duration")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="style">Style</Label>
              <Input id="style" {...register("style")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input type="number" id="year" {...register("year", { valueAsNumber: true })} />
            </div>
             <div className="space-y-2 md:col-span-2">
              <Label htmlFor="heroImage">Hero Image URL</Label>
              <Input id="heroImage" {...register("heroImage")} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="brief">Project Brief</Label>
              <Textarea id="brief" {...register("brief")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="approach">Design Approach</Label>
              <Textarea id="approach" {...register("approach")} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Materials</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {materialFields.map((field, index) => (
              <div key={field.id} className="flex gap-4 items-start">
                <div className="grid gap-4 flex-1 md:grid-cols-2">
                  <Input placeholder="Material Name" {...register(`materials.${index}.name`)} />
                  <Input placeholder="Details" {...register(`materials.${index}.details`)} />
                </div>
                <Button type="button" variant="ghost" size="icon" onClick={() => removeMaterial(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={() => appendMaterial({ name: "", details: "" })}>
              <Plus className="mr-2 h-4 w-4" /> Add Material
            </Button>
          </CardContent>
        </Card>
        
        {/* Simplified Gallery: just editing the first room's images for now */}
        <Card>
            <CardHeader>
                <CardTitle>Gallery (Main Room)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <Label>Image URL (First Image)</Label>
                <Input {...register(`gallery.0.images.0`)} placeholder="/assets/..." />
                <input type="hidden" {...register(`gallery.0.room`)} value="Main" />
                 <p className="text-sm text-muted-foreground">
                    Note: This simplified editor only supports editing the first image of the first room. 
                    For full gallery management, more complex logic is needed.
                </p>
            </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Testimonial</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
             <div className="space-y-2 md:col-span-2">
              <Label htmlFor="quote">Quote</Label>
              <Textarea id="quote" {...register("testimonial.quote")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input id="author" {...register("testimonial.author")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input id="role" {...register("testimonial.role")} />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button variant="outline" type="button" onClick={() => navigate("/admin/projects")}>
            Cancel
          </Button>
          <Button type="submit">
            {isEditing ? "Update Project" : "Create Project"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminProjectEditor;
