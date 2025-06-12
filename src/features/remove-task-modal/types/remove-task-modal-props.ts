export interface RemoveTaskModalProps {
  isVisible: boolean;
  taskTitle: string;
  onClose: () => void;
  onConfirm: () => void;
}