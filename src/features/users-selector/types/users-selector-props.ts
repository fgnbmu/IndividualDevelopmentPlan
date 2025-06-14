export interface UsersSelectorProps {
  selectedUserId?: string;
  onUserChange: (userId: string) => void;
  selectorWidth: number;
}