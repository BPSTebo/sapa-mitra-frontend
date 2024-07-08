export type Team =
  | "SOSIAL"
  | "PRODUKSI"
  | "DISTRIBUSI"
  | "NERWILIS"
  | "IPDS"
  | "TU";

export type Position = "ANGGOTA" | "KETUA" | "KEPALA";

export type User = {
  id: string;
  name: string;
  nip: string;
  email: string;
  team: Team | null;
  position: Position;
};
