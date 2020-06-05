export interface Message {
  client_msg_id: string;
  type: string;
  text: string;
  user: string;
  ts: string;
  team: string;
  user_team: string;
  source_team: string;
  user_profile: {
    avatar_hash: string;
    image_72: string;
    first_name: string;
    real_name: string;
    display_name: string;
    team: string;
    name: string;
    is_restricted: boolean;
    is_ultra_restricted: boolean;
  };
  blocks: {
    type: string;
    block_id: string;
    elements: {
      type: string;
      text: string;
    }[];
  }[];
}
