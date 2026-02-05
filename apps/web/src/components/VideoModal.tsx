import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
}

const VideoModal = ({ isOpen, onClose, videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ" }: VideoModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 bg-foreground border-none overflow-hidden">
        <VisuallyHidden>
          <DialogTitle>Design Showreel Video</DialogTitle>
        </VisuallyHidden>
        <div className="aspect-video w-full">
          <iframe
            src={isOpen ? videoUrl : ""}
            title="Crossangle Interior Showreel"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;
