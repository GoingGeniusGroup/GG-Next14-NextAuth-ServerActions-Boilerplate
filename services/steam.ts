import { z } from "zod";

const steamIdSchema = z.object({
  steamId: z.string().regex(/^[0-9]{17}$/, "Invalid Steam ID format"),
});

export type SteamPlayerData = {
  steamid: string;
  personaname: string;
  profileurl: string;
  avatar: string;
  avatarmedium: string;
  avatarfull: string;
  personastate: number;
  communityvisibilitystate: number;
  profilestate?: number;
  lastlogoff?: number;
  commentpermission?: number;
  realname?: string;
  primaryclanid?: string;
  timecreated?: number;
  gameid?: string;
  gameserverip?: string;
  gameextrainfo?: string;
  loccountrycode?: string;
  locstatecode?: string;
  loccityid?: number;
};

export type Game = {
  appid: number;
  name: string;
  playtime_2weeks: number;
  playtime_forever: number;
  img_icon_url: string;
  img_logo_url: string;
  has_community_visible_stats: boolean;
};

export type GetOwnedGamesResponse = {
  game_count: number;
  games: Game[];
};

export type UserGameStats = {
  steamID: string;
  gameName: string;
  stats: { name: string; value: number }[];
  achievements: { name: string; achieved: number }[];
};

export const getSteamPlayerSummary = async (steamId: string): Promise<SteamPlayerData | null> => {
  const apiKey = process.env.STEAM_API_KEY;
  if (!apiKey) {
    console.error("Steam API key is not set");
    return null;
  }

  const url = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${steamId}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.response && data.response.players && data.response.players.length > 0) {
      return data.response.players[0] as SteamPlayerData;
    } else {
      console.error("No player data found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching Steam player data:", error);
    return null;
  }
};

export const getOwnedGames = async (steamId: string): Promise<GetOwnedGamesResponse | null> => {
  const apiKey = process.env.STEAM_API_KEY;
  if (!apiKey) {
    console.error("Steam API key is not set");
    return null;
  }

  const url = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${apiKey}&steamid=${steamId}&include_appinfo=1&include_played_free_games=1&format=json`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.response && 'games' in data.response) {
      return data.response as GetOwnedGamesResponse;
    } else {
      console.error("No games found or profile is private");
      return null;
    }
  } catch (error) {
    console.error("Error fetching owned games:", error);
    return null;
  }
};

export const getUserStatsForGame = async (steamId: string, appId: number): Promise<UserGameStats | null> => {
  const apiKey = process.env.STEAM_API_KEY;
  if (!apiKey) {
    console.error("Steam API key is not set");
    return null;
  }

  const url = `http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=${appId}&key=${apiKey}&steamid=${steamId}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.playerstats) {
      return {
        steamID: data.playerstats.steamID,
        gameName: data.playerstats.gameName,
        stats: data.playerstats.stats || [],
        achievements: data.playerstats.achievements || [],
      };
    } else {
      console.error("No player stats found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user game stats:", error);
    return null;
  }
};