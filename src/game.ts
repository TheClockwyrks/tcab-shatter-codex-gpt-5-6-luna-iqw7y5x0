/* eslint-disable prefer-const, @typescript-eslint/no-explicit-any, no-useless-assignment, @typescript-eslint/no-unused-expressions */
import type {
  Game,
  InitApi,
  RenderApi,
  UpdateApi,
} from "@clockwyrks/simple-2d";
import type { DeepReadonly } from "ts-essentials";
import * as C from "./constants";
import type { RockSize } from "./constants";

export type Screen = "title" | "howto" | "playing" | "paused" | "gameover";
export type SaucerEdge = "left" | "right";
export type FieldEdge = "top" | "bottom" | "left" | "right";
export interface ShipState {
  readonly x: number;
  readonly y: number;
  readonly vx: number;
  readonly vy: number;
  readonly angle: number;
  readonly thrusting: boolean;
  readonly invuln: number;
  readonly collision: boolean;
  readonly fireCooldown: number;
}
export interface BulletState {
  readonly id: number;
  readonly x: number;
  readonly y: number;
  readonly vx: number;
  readonly vy: number;
  readonly life: number;
}
export interface RockState {
  readonly id: number;
  readonly x: number;
  readonly y: number;
  readonly vx: number;
  readonly vy: number;
  readonly size: RockSize;
  readonly spin: number;
  readonly health: number;
  readonly flash: number;
}
export interface SaucerState {
  readonly id: number;
  readonly x: number;
  readonly y: number;
  readonly vx: number;
  readonly vy: number;
  readonly mind: boolean;
  readonly gun: boolean;
  readonly travel: boolean;
  readonly weave: 1 | -1;
  readonly fireClock: number;
  readonly weaveClock: number;
  readonly age: number;
}
export interface TorpedoState {
  readonly id: number;
  readonly x: number;
  readonly y: number;
  readonly vx: number;
  readonly vy: number;
  readonly heading: number;
  readonly life: number;
  readonly homing: boolean;
}
export interface ShatterState {
  readonly screen: Screen;
  readonly menuIndex: number;
  readonly score: number;
  readonly lives: number;
  readonly wave: number;
  readonly waveBanner: number;
  readonly ship: ShipState;
  readonly bullets: readonly BulletState[];
  readonly rocks: readonly RockState[];
  readonly saucer: SaucerState | null;
  readonly enemyBullets: readonly BulletState[];
  readonly torpedoes: readonly TorpedoState[];
  readonly torpedoCharge: number;
  readonly waveSpawning: boolean;
  readonly saucerSpawning: boolean;
  readonly saucerClock: number;
  readonly saucerDue: number;
  readonly nextSaucerEdge: SaucerEdge | null;
  readonly nextSaucerRow: number | null;
  readonly nextSaucerAim: number | null;
  readonly nextRockSpeed: number | null;
  readonly nextRecycleEdge: FieldEdge | null;
  readonly tickClock: number;
  readonly nextId: number;
  readonly simTime: number;
  readonly muted: boolean;
  readonly extraLifeMark: number;
  readonly pointerEntry: number | null;
}
export interface Snapshot {
  readonly version: number;
  readonly screen: Screen;
  readonly menuIndex: number;
  readonly score: number;
  readonly lives: number;
  readonly wave: number;
  readonly waveBanner: number;
  readonly muted: boolean;
  readonly waveSpawning: boolean;
  readonly saucerSpawning: boolean;
  readonly saucerClock: number;
  readonly saucerDue: number;
  readonly nextSaucerEdge: SaucerEdge | null;
  readonly nextSaucerRow: number | null;
  readonly nextSaucerAim: number | null;
  readonly nextRockSpeed: number | null;
  readonly nextRecycleEdge: FieldEdge | null;
  readonly ship: ShipState & { speed: number };
  readonly bullets: readonly BulletState[];
  readonly rocks: readonly (RockState & { radius: number })[];
  readonly saucer: SaucerState | null;
  readonly enemyBullets: readonly BulletState[];
  readonly torpedoes: readonly TorpedoState[];
  readonly torpedoCharge: number;
  readonly torpedoReady: boolean;
  readonly simTime: number;
}
export interface ShatterDebugApi {
  readonly version: number;
  reset(s: DeepReadonly<ShatterState>): ShatterState;
  snapshot(s: DeepReadonly<ShatterState>): Snapshot;
  reconcile(s: DeepReadonly<ShatterState>): ShatterState;
  menuItemRect(
    s: DeepReadonly<ShatterState>,
    i: number,
  ): { x: number; y: number; w: number; h: number } | null;
  setScreen(s: DeepReadonly<ShatterState>, v: Screen): ShatterState;
  setMenuIndex(s: DeepReadonly<ShatterState>, v: number): ShatterState;
  setScore(s: DeepReadonly<ShatterState>, v: number): ShatterState;
  setLives(s: DeepReadonly<ShatterState>, v: number): ShatterState;
  setWave(s: DeepReadonly<ShatterState>, v: number): ShatterState;
  setWaveBanner(s: DeepReadonly<ShatterState>, v: number): ShatterState;
  setWaveSpawning(s: DeepReadonly<ShatterState>, v: boolean): ShatterState;
  setSaucerSpawning(s: DeepReadonly<ShatterState>, v: boolean): ShatterState;
  setSaucerDue(s: DeepReadonly<ShatterState>, v: number): ShatterState;
  setShipPosition(
    s: DeepReadonly<ShatterState>,
    x: number,
    y: number,
  ): ShatterState;
  setShipVelocity(
    s: DeepReadonly<ShatterState>,
    x: number,
    y: number,
  ): ShatterState;
  setShipAngle(s: DeepReadonly<ShatterState>, v: number): ShatterState;
  setShipInvuln(s: DeepReadonly<ShatterState>, v: number): ShatterState;
  setFireCooldown(s: DeepReadonly<ShatterState>, v: number): ShatterState;
  setShipCollision(s: DeepReadonly<ShatterState>, v: boolean): ShatterState;
  addBullet(
    s: DeepReadonly<ShatterState>,
    x: number,
    y: number,
    vx: number,
    vy: number,
  ): ShatterState;
  removeBullet(s: DeepReadonly<ShatterState>, id: number): ShatterState;
  clearBullets(s: DeepReadonly<ShatterState>): ShatterState;
  addEnemyBullet(
    s: DeepReadonly<ShatterState>,
    x: number,
    y: number,
    vx: number,
    vy: number,
  ): ShatterState;
  removeEnemyBullet(s: DeepReadonly<ShatterState>, id: number): ShatterState;
  clearEnemyBullets(s: DeepReadonly<ShatterState>): ShatterState;
  addRock(
    s: DeepReadonly<ShatterState>,
    size: RockSize,
    x: number,
    y: number,
  ): ShatterState;
  setRockVelocity(
    s: DeepReadonly<ShatterState>,
    id: number,
    vx: number,
    vy: number,
  ): ShatterState;
  setRockHealth(
    s: DeepReadonly<ShatterState>,
    id: number,
    v: number,
  ): ShatterState;
  removeRock(s: DeepReadonly<ShatterState>, id: number): ShatterState;
  clearRocks(s: DeepReadonly<ShatterState>): ShatterState;
  addSaucer(s: DeepReadonly<ShatterState>, x: number, y: number): ShatterState;
  setSaucerVelocity(
    s: DeepReadonly<ShatterState>,
    x: number,
    y: number,
  ): ShatterState;
  setSaucerWeave(s: DeepReadonly<ShatterState>, v: 1 | -1): ShatterState;
  removeSaucer(s: DeepReadonly<ShatterState>): ShatterState;
  setSaucerMind(s: DeepReadonly<ShatterState>, v: boolean): ShatterState;
  setSaucerGun(s: DeepReadonly<ShatterState>, v: boolean): ShatterState;
  setSaucerTravel(s: DeepReadonly<ShatterState>, v: boolean): ShatterState;
  setNextSaucerEdge(s: DeepReadonly<ShatterState>, v: SaucerEdge): ShatterState;
  setNextSaucerRow(s: DeepReadonly<ShatterState>, v: number): ShatterState;
  setNextSaucerAim(s: DeepReadonly<ShatterState>, v: number): ShatterState;
  setNextRockSpeed(s: DeepReadonly<ShatterState>, v: number): ShatterState;
  setNextRecycleEdge(s: DeepReadonly<ShatterState>, v: FieldEdge): ShatterState;
  setTorpedoCharge(s: DeepReadonly<ShatterState>, v: number): ShatterState;
  addTorpedo(
    s: DeepReadonly<ShatterState>,
    x: number,
    y: number,
    h: number,
  ): ShatterState;
  setTorpedoHeading(
    s: DeepReadonly<ShatterState>,
    id: number,
    h: number,
  ): ShatterState;
  setTorpedoHoming(
    s: DeepReadonly<ShatterState>,
    id: number,
    v: boolean,
  ): ShatterState;
  removeTorpedo(s: DeepReadonly<ShatterState>, id: number): ShatterState;
  clearTorpedoes(s: DeepReadonly<ShatterState>): ShatterState;
}

export const BACKGROUND = "#070916";
const W = C.FIELD_W,
  H = C.FIELD_H,
  wrap = (n: number, m: number) => ((n % m) + m) % m;
const sep = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): [number, number] => {
  let x = x2 - x1,
    y = y2 - y1;
  if (x > W / 2) x -= W;
  if (x < -W / 2) x += W;
  if (y > H / 2) y -= H;
  if (y < -H / 2) y += H;
  return [x, y];
};
const distance = (x1: number, y1: number, x2: number, y2: number) =>
  Math.hypot(...sep(x1, y1, x2, y2));
const angle = (x: number, y: number) => Math.atan2(y, x),
  norm = (x: number) => Math.atan2(Math.sin(x), Math.cos(x));
const ship = (): ShipState => ({
  x: C.SAFE_X,
  y: C.SAFE_Y,
  vx: 0,
  vy: 0,
  angle: C.FACE_UP,
  thrusting: false,
  invuln: 0,
  collision: true,
  fireCooldown: 0,
});
const initial = (): ShatterState => ({
  screen: "title",
  menuIndex: 0,
  score: 0,
  lives: C.START_LIVES,
  wave: 0,
  waveBanner: 0,
  ship: ship(),
  bullets: [],
  rocks: [],
  saucer: null,
  enemyBullets: [],
  torpedoes: [],
  torpedoCharge: 1,
  waveSpawning: true,
  saucerSpawning: true,
  saucerClock: 0,
  saucerDue: C.SAUCER_FIRST_DELAY,
  nextSaucerEdge: null,
  nextSaucerRow: null,
  nextSaucerAim: null,
  nextRockSpeed: null,
  nextRecycleEdge: null,
  tickClock: 0,
  nextId: 1,
  simTime: 0,
  muted: false,
  extraLifeMark: 0,
  pointerEntry: null,
});
const count = (s: Screen) =>
  s === "title"
    ? C.TITLE_ITEMS.length
    : s === "paused"
      ? C.PAUSE_ITEMS.length
      : s === "gameover"
        ? C.GAMEOVER_ITEMS.length
        : 0;
const menuRect = (s: Screen, i: number) =>
  i >= 0 && i < count(s) ? { x: 390, y: 390 + i * 68, w: 500, h: 48 } : null;
const fresh = (s: ShatterState): [number, number] => [s.nextId, s.nextId + 1];
const ensure = (xs: readonly { id: number }[], id: number) => {
  if (!xs.some((x) => x.id === id))
    throw new Error(`Shatter: unknown id ${id}`);
};

function debug(): ShatterDebugApi {
  const field = (
    s: DeepReadonly<ShatterState>,
    k: keyof ShatterState,
    v: unknown,
  ) => ({ ...s, [k]: v }) as ShatterState;
  const entity = (
    s: DeepReadonly<ShatterState>,
    list: "bullets" | "enemyBullets" | "rocks" | "torpedoes",
    id: number,
    fn: (x: any) => any,
  ) => {
    const xs = s[list];
    ensure(xs, id);
    return {
      ...s,
      [list]: xs.map((x: any) => (x.id === id ? fn(x) : x)),
    } as ShatterState;
  };
  return {
    version: C.SHATTER_DEBUG_VERSION,
    reset: () => initial(),
    snapshot: (s) => ({
      version: C.SHATTER_DEBUG_VERSION,
      screen: s.screen,
      menuIndex: s.menuIndex,
      score: s.score,
      lives: s.lives,
      wave: s.wave,
      waveBanner: s.waveBanner,
      muted: s.muted,
      waveSpawning: s.waveSpawning,
      saucerSpawning: s.saucerSpawning,
      saucerClock: s.saucerClock,
      saucerDue: s.saucerDue,
      nextSaucerEdge: s.nextSaucerEdge,
      nextSaucerRow: s.nextSaucerRow,
      nextSaucerAim: s.nextSaucerAim,
      nextRockSpeed: s.nextRockSpeed,
      nextRecycleEdge: s.nextRecycleEdge,
      ship: { ...s.ship, speed: Math.hypot(s.ship.vx, s.ship.vy) },
      bullets: s.bullets.map((x) => ({ ...x })),
      rocks: s.rocks.map((x) => ({ ...x, radius: C.ROCK_RADIUS[x.size] })),
      saucer: s.saucer ? { ...s.saucer } : null,
      enemyBullets: s.enemyBullets.map((x) => ({ ...x })),
      torpedoes: s.torpedoes.map((x) => ({ ...x })),
      torpedoCharge: s.torpedoCharge,
      torpedoReady: s.torpedoCharge === 1,
      simTime: s.simTime,
    }),
    reconcile: (s) => ({ ...s }),
    menuItemRect: (s, i) => menuRect(s.screen, i),
    setScreen: (s, v) => field(s, "screen", v),
    setMenuIndex: (s, v) => field(s, "menuIndex", v),
    setScore: (s, v) => field(s, "score", v),
    setLives: (s, v) => field(s, "lives", v),
    setWave: (s, v) => field(s, "wave", v),
    setWaveBanner: (s, v) => field(s, "waveBanner", v),
    setWaveSpawning: (s, v) => field(s, "waveSpawning", v),
    setSaucerSpawning: (s, v) => field(s, "saucerSpawning", v),
    setSaucerDue: (s, v) => field(s, "saucerDue", v),
    setShipPosition: (s, x, y) => ({ ...s, ship: { ...s.ship, x, y } }),
    setShipVelocity: (s, vx, vy) => ({ ...s, ship: { ...s.ship, vx, vy } }),
    setShipAngle: (s, angle) => ({ ...s, ship: { ...s.ship, angle } }),
    setShipInvuln: (s, invuln) => ({ ...s, ship: { ...s.ship, invuln } }),
    setFireCooldown: (s, fireCooldown) => ({
      ...s,
      ship: { ...s.ship, fireCooldown },
    }),
    setShipCollision: (s, collision) => ({
      ...s,
      ship: { ...s.ship, collision },
    }),
    addBullet: (s, x, y, vx, vy) => {
      const [id, nextId] = fresh(s);
      return {
        ...s,
        nextId,
        bullets: [...s.bullets, { id, x, y, vx, vy, life: C.BULLET_LIFE }],
      };
    },
    removeBullet: (s, id) => {
      ensure(s.bullets, id);
      return { ...s, bullets: s.bullets.filter((x) => x.id !== id) };
    },
    clearBullets: (s) => ({ ...s, bullets: [] }),
    addEnemyBullet: (s, x, y, vx, vy) => {
      const [id, nextId] = fresh(s);
      return {
        ...s,
        nextId,
        enemyBullets: [
          ...s.enemyBullets,
          { id, x, y, vx, vy, life: C.SAUCER_BULLET_LIFE },
        ],
      };
    },
    removeEnemyBullet: (s, id) => {
      ensure(s.enemyBullets, id);
      return { ...s, enemyBullets: s.enemyBullets.filter((x) => x.id !== id) };
    },
    clearEnemyBullets: (s) => ({ ...s, enemyBullets: [] }),
    addRock: (s, size, x, y) => {
      const [id, nextId] = fresh(s);
      return {
        ...s,
        nextId,
        rocks: [
          ...s.rocks,
          {
            id,
            x,
            y,
            vx: 0,
            vy: 0,
            size,
            spin: 0,
            health: C.ROCK_HEALTH[size],
            flash: 0,
          },
        ],
      };
    },
    setRockVelocity: (s, id, vx, vy) =>
      entity(s, "rocks", id, (x) => ({ ...x, vx, vy })),
    setRockHealth: (s, id, health) => {
      const r = s.rocks.find((x) => x.id === id);
      if (
        !r ||
        !Number.isInteger(health) ||
        health < 1 ||
        health > C.ROCK_HEALTH[r.size]
      )
        throw new Error("Shatter: invalid rock health");
      return entity(s, "rocks", id, (x) => ({ ...x, health }));
    },
    removeRock: (s, id) => {
      ensure(s.rocks, id);
      return { ...s, rocks: s.rocks.filter((x) => x.id !== id) };
    },
    clearRocks: (s) => ({ ...s, rocks: [] }),
    addSaucer: (s, x, y) => {
      const [id, nextId] = fresh(s);
      return {
        ...s,
        nextId,
        saucer: {
          id,
          x,
          y,
          vx: C.SAUCER_SPEED,
          vy: 0,
          mind: true,
          gun: true,
          travel: true,
          weave: 1,
          fireClock: C.SAUCER_FIRE_INTERVAL,
          weaveClock: C.SAUCER_WEAVE_INTERVAL,
          age: 0,
        },
      };
    },
    setSaucerVelocity: (s, vx, vy) =>
      s.saucer ? { ...s, saucer: { ...s.saucer, vx, vy } } : s,
    setSaucerWeave: (s, weave) =>
      s.saucer ? { ...s, saucer: { ...s.saucer, weave } } : s,
    removeSaucer: (s) => ({ ...s, saucer: null }),
    setSaucerMind: (s, mind) =>
      s.saucer ? { ...s, saucer: { ...s.saucer, mind } } : s,
    setSaucerGun: (s, gun) =>
      s.saucer ? { ...s, saucer: { ...s.saucer, gun } } : s,
    setSaucerTravel: (s, travel) =>
      s.saucer ? { ...s, saucer: { ...s.saucer, travel } } : s,
    setNextSaucerEdge: (s, v) => ({ ...s, nextSaucerEdge: v }),
    setNextSaucerRow: (s, v) => ({ ...s, nextSaucerRow: v }),
    setNextSaucerAim: (s, v) => ({ ...s, nextSaucerAim: v }),
    setNextRockSpeed: (s, v) => ({ ...s, nextRockSpeed: v }),
    setNextRecycleEdge: (s, v) => ({ ...s, nextRecycleEdge: v }),
    setTorpedoCharge: (s, v) => ({ ...s, torpedoCharge: v }),
    addTorpedo: (s, x, y, heading) => {
      const [id, nextId] = fresh(s);
      return {
        ...s,
        nextId,
        torpedoes: [
          ...s.torpedoes,
          {
            id,
            x,
            y,
            heading,
            vx: C.TORPEDO_SPEED * Math.cos(heading),
            vy: C.TORPEDO_SPEED * Math.sin(heading),
            life: C.TORPEDO_LIFE,
            homing: true,
          },
        ],
      };
    },
    setTorpedoHeading: (s, id, heading) =>
      entity(s, "torpedoes", id, (x) => ({
        ...x,
        heading,
        vx: C.TORPEDO_SPEED * Math.cos(heading),
        vy: C.TORPEDO_SPEED * Math.sin(heading),
      })),
    setTorpedoHoming: (s, id, homing) =>
      entity(s, "torpedoes", id, (x) => ({ ...x, homing })),
    removeTorpedo: (s, id) => {
      ensure(s.torpedoes, id);
      return { ...s, torpedoes: s.torpedoes.filter((x) => x.id !== id) };
    },
    clearTorpedoes: (s) => ({ ...s, torpedoes: [] }),
  };
}

function waves(s: ShatterState): ShatterState {
  let id = s.nextId;
  const xs: RockState[] = [];
  const factor =
    1 + Math.min(C.WAVE_SPEED_CAP, C.WAVE_SPEED_STEP * (s.wave - 1));
  for (let i = 0; i < C.WAVE_BASE_ROCKS + s.wave; i++) {
    let x = 0,
      y = 0;
    do {
      x = Math.random() * W;
      y = Math.random() * H;
    } while (
      distance(x, y, s.ship.x, s.ship.y) < C.WAVE_MIN_SHIP_DIST ||
      distance(x, y, C.STAR_X, C.STAR_Y) < C.WAVE_MIN_STAR_DIST
    );
    const a = Math.random() * Math.PI * 2,
      b =
        s.nextRockSpeed ??
        C.ROCK_SPEED_MIN.large +
          Math.random() * (C.ROCK_SPEED_MAX.large - C.ROCK_SPEED_MIN.large);
    xs.push({
      id: id++,
      x,
      y,
      vx: Math.cos(a) * b * factor,
      vy: Math.sin(a) * b * factor,
      size: "large",
      spin: Math.random() * 6,
      health: C.ROCK_HEALTH.large,
      flash: 0,
    });
  }
  return { ...s, nextId: id, rocks: xs, nextRockSpeed: null };
}

function step(
  s: ShatterState,
  input: {
    left: boolean;
    right: boolean;
    up: boolean;
    fire: boolean;
    torpedo: boolean;
  },
  audio: UpdateApi["audio"],
): ShatterState {
  let q = { ...s, simTime: s.simTime + C.TICK_DT };
  let sh = s.ship;
  const a =
    sh.angle +
    (input.right ? 1 : 0) * C.SHIP_TURN * C.TICK_DT -
    (input.left ? 1 : 0) * C.SHIP_TURN * C.TICK_DT;
  let vx = sh.vx + (input.up ? Math.cos(a) * C.SHIP_THRUST * C.TICK_DT : 0),
    vy = sh.vy + (input.up ? Math.sin(a) * C.SHIP_THRUST * C.TICK_DT : 0);
  const drag = Math.pow(0.5, C.TICK_DT / C.SHIP_DRAG_HALFLIFE);
  vx *= drag;
  vy *= drag;
  const sp = Math.hypot(vx, vy);
  if (sp > C.SHIP_MAX) {
    vx = (vx / sp) * C.SHIP_MAX;
    vy = (vy / sp) * C.SHIP_MAX;
  }
  sh = {
    ...sh,
    angle: a,
    vx,
    vy,
    x: wrap(sh.x + vx * C.TICK_DT, W),
    y: wrap(sh.y + vy * C.TICK_DT, H),
    thrusting: input.up,
    invuln: Math.max(0, sh.invuln - C.TICK_DT),
    fireCooldown: Math.max(0, sh.fireCooldown - 1),
  };
  if (input.fire && sh.fireCooldown === 0 && q.bullets.length < C.MAX_BULLETS) {
    const [id, nextId] = fresh(q),
      dx = Math.cos(a),
      dy = Math.sin(a);
    q = {
      ...q,
      nextId,
      bullets: [
        ...q.bullets,
        {
          id,
          x: wrap(sh.x + dx * C.SHIP_R, W),
          y: wrap(sh.y + dy * C.SHIP_R, H),
          vx: sh.vx + dx * C.MUZZLE_SPEED,
          vy: sh.vy + dy * C.MUZZLE_SPEED,
          life: C.BULLET_LIFE,
        },
      ],
      ship: { ...sh, fireCooldown: C.FIRE_INTERVAL_TICKS },
    };
    audio.play(C.CUES.fire);
  }
  if (input.torpedo && q.torpedoCharge === 1 && !q.torpedoes.length) {
    const [id, nextId] = fresh(q),
      dx = Math.cos(a),
      dy = Math.sin(a);
    q = {
      ...q,
      nextId,
      torpedoCharge: 0,
      torpedoes: [
        ...q.torpedoes,
        {
          id,
          x: wrap(sh.x + dx * C.SHIP_R, W),
          y: wrap(sh.y + dy * C.SHIP_R, H),
          vx: dx * C.TORPEDO_SPEED,
          vy: dy * C.TORPEDO_SPEED,
          heading: a,
          life: C.TORPEDO_LIFE,
          homing: true,
        },
      ],
    };
    audio.play(C.CUES.fire);
  }
  q = {
    ...q,
    ship: sh,
    torpedoCharge: Math.min(
      1,
      q.torpedoCharge + C.TICK_DT / C.TORPEDO_RECHARGE,
    ),
  };
  const gravity = (x: number, y: number): [number, number] => {
    const dx = C.STAR_X - x,
      dy = C.STAR_Y - y,
      r = Math.hypot(dx, dy),
      e = Math.max(r, C.SOFTEN),
      f = C.MU / (e * e);
    return r ? [(dx / r) * f, (dy / r) * f] : [0, 0];
  };
  const move = (b: BulletState): BulletState => {
    const [gx, gy] = gravity(b.x, b.y);
    return {
      ...b,
      x: wrap(b.x + (b.vx + gx * C.TICK_DT) * C.TICK_DT, W),
      y: wrap(b.y + (b.vy + gy * C.TICK_DT) * C.TICK_DT, H),
      vx: b.vx + gx * C.TICK_DT,
      vy: b.vy + gy * C.TICK_DT,
      life: b.life - C.TICK_DT,
    };
  };
  let bullets = q.bullets.map(move).filter((x) => x.life > 0),
    enemy = q.enemyBullets.map(move).filter((x) => x.life > 0);
  let rocks = q.rocks.map((r) => {
    const [gx, gy] = gravity(r.x, r.y);
    return {
      ...r,
      x: wrap(r.x + (r.vx + gx * C.TICK_DT) * C.TICK_DT, W),
      y: wrap(r.y + (r.vy + gy * C.TICK_DT) * C.TICK_DT, H),
      vx: r.vx + gx * C.TICK_DT,
      vy: r.vy + gy * C.TICK_DT,
      spin: r.spin + C.TICK_DT,
      flash: Math.max(0, r.flash - C.TICK_DT),
    };
  });
  let torpedoes = q.torpedoes
    .map((t) => {
      let h = t.heading;
      if (t.homing) {
        let target: RockState | null = null,
          best = Infinity;
        for (const r of rocks) {
          const [dx, dy] = sep(t.x, t.y, r.x, r.y),
            dd = Math.hypot(dx, dy);
          if (
            dd < best &&
            Math.abs(norm(angle(dx, dy) - h)) <= C.TORPEDO_CONE
          ) {
            best = dd;
            target = r;
          }
        }
        if (target) {
          const [dx, dy] = sep(t.x, t.y, target.x, target.y);
          h += Math.max(
            -C.TORPEDO_TURN * C.TICK_DT,
            Math.min(C.TORPEDO_TURN * C.TICK_DT, norm(angle(dx, dy) - h)),
          );
        }
      }
      return {
        ...t,
        heading: h,
        vx: C.TORPEDO_SPEED * Math.cos(h),
        vy: C.TORPEDO_SPEED * Math.sin(h),
        x: wrap(t.x + t.vx * C.TICK_DT, W),
        y: wrap(t.y + t.vy * C.TICK_DT, H),
        life: t.life - C.TICK_DT,
      };
    })
    .filter((x) => x.life > 0);
  let saucer = q.saucer;
  let sc = q.saucerClock + C.TICK_DT,
    nextId = q.nextId;
  if (saucer) {
    let u = {
      ...saucer,
      age: saucer.age + C.TICK_DT,
      fireClock: saucer.fireClock - C.TICK_DT,
      weaveClock: saucer.weaveClock - C.TICK_DT,
    };
    if (u.mind && u.weaveClock <= 0)
      u = {
        ...u,
        weaveClock: C.SAUCER_WEAVE_INTERVAL,
        vy:
          u.vy === 0
            ? u.weave * C.SAUCER_WEAVE_SPEED
            : -Math.sign(u.vy) * C.SAUCER_WEAVE_SPEED,
      };
    if (u.travel)
      u = {
        ...u,
        x: wrap(u.x + u.vx * C.TICK_DT, W),
        y: wrap(u.y + u.vy * C.TICK_DT, H),
      };
    if (u.gun && u.fireClock <= 0) {
      const [dx, dy] = sep(u.x, u.y, sh.x, sh.y),
        aa =
          angle(dx, dy) +
          (q.nextSaucerAim ?? (Math.random() * 2 - 1) * C.SAUCER_AIM_ERROR);
      enemy = [
        ...enemy,
        {
          id: nextId++,
          x: u.x,
          y: u.y,
          vx: u.vx + Math.cos(aa) * C.SAUCER_BULLET_SPEED,
          vy: u.vy + Math.sin(aa) * C.SAUCER_BULLET_SPEED,
          life: C.SAUCER_BULLET_LIFE,
        },
      ];
      u = { ...u, fireClock: C.SAUCER_FIRE_INTERVAL };
    }
    if (u.age >= C.SAUCER_LIFETIME) {
      saucer = null;
      sc = 0;
    } else saucer = u;
  } else if (q.saucerSpawning && sc >= q.saucerDue) {
    const e = q.nextSaucerEdge ?? (Math.random() < 0.5 ? "left" : "right"),
      y = q.nextSaucerRow ?? C.SAUCER_R + Math.random() * (H - 2 * C.SAUCER_R);
    saucer = {
      id: nextId++,
      x: e === "left" ? -C.SAUCER_R : W + C.SAUCER_R,
      y,
      vx: e === "left" ? C.SAUCER_SPEED : -C.SAUCER_SPEED,
      vy: 0,
      mind: true,
      gun: true,
      travel: true,
      weave: 1,
      fireClock: C.SAUCER_FIRE_INTERVAL,
      weaveClock: C.SAUCER_WEAVE_INTERVAL,
      age: 0,
    };
    sc = 0;
    audio.play(C.CUES.saucer);
  }
  const hit = (x: number, y: number, tx: number, ty: number, r: number) =>
    distance(x, y, tx, ty) <= r;
  for (const b of bullets) {
    if (hit(b.x, b.y, C.STAR_X, C.STAR_Y, C.CORE_R)) {
      bullets = bullets.filter((x) => x.id !== b.id);
      continue;
    }
    const i = rocks.findIndex((r) =>
      hit(b.x, b.y, r.x, r.y, C.BULLET_R + C.ROCK_RADIUS[r.size]),
    );
    if (i >= 0) {
      const r = rocks[i];
      bullets = bullets.filter((x) => x.id !== b.id);
      if (r.health <= 1) {
        q = {
          ...q,
          score:
            q.score +
            (r.size === "large"
              ? C.SCORE_LARGE
              : r.size === "medium"
                ? C.SCORE_MEDIUM
                : C.SCORE_SMALL),
        };
        const child = C.ROCK_CHILD[r.size];
        if (child) {
          const kick = angle(b.vx, b.vy) + Math.PI / 2;
          rocks.splice(
            i,
            1,
            {
              ...r,
              id: nextId++,
              size: child,
              health: C.ROCK_HEALTH[child],
              vx: r.vx + Math.cos(kick) * C.SPLIT_KICK,
              vy: r.vy + Math.sin(kick) * C.SPLIT_KICK,
            },
            {
              ...r,
              id: nextId++,
              size: child,
              health: C.ROCK_HEALTH[child],
              vx: r.vx - Math.cos(kick) * C.SPLIT_KICK,
              vy: r.vy - Math.sin(kick) * C.SPLIT_KICK,
            },
          );
        } else rocks.splice(i, 1);
        audio.play(C.CUES.shatter);
      } else rocks[i] = { ...r, health: r.health - 1, flash: C.HIT_FLASH_TIME };
    } else if (
      saucer &&
      hit(b.x, b.y, saucer.x, saucer.y, C.SAUCER_R + C.BULLET_R)
    ) {
      bullets = bullets.filter((x) => x.id !== b.id);
      saucer = null;
      q = { ...q, score: q.score + C.SCORE_SAUCER };
    }
  }
  for (const t of torpedoes) {
    const i = rocks.findIndex((r) =>
      hit(t.x, t.y, r.x, r.y, C.TORPEDO_R + C.ROCK_RADIUS[r.size]),
    );
    if (i >= 0) {
      torpedoes = torpedoes.filter((x) => x.id !== t.id);
      const r = rocks[i],
        child = C.ROCK_CHILD[r.size];
      q = {
        ...q,
        score:
          q.score +
          (r.size === "large"
            ? C.SCORE_LARGE
            : r.size === "medium"
              ? C.SCORE_MEDIUM
              : C.SCORE_SMALL),
      };
      if (child)
        rocks.splice(
          i,
          1,
          {
            ...r,
            id: nextId++,
            size: child,
            health: C.ROCK_HEALTH[child],
            vx: r.vx + C.TORPEDO_SCATTER * Math.cos(t.heading),
            vy: r.vy + C.TORPEDO_SCATTER * Math.sin(t.heading),
          },
          {
            ...r,
            id: nextId++,
            size: child,
            health: C.ROCK_HEALTH[child],
            vx: r.vx - C.TORPEDO_SCATTER * Math.cos(t.heading),
            vy: r.vy - C.TORPEDO_SCATTER * Math.sin(t.heading),
          },
        );
      else rocks.splice(i, 1);
    }
  }
  if (
    sh.collision &&
    sh.invuln <= 0 &&
    (rocks.some((r) =>
      hit(sh.x, sh.y, r.x, r.y, C.SHIP_R + C.ROCK_RADIUS[r.size]),
    ) ||
      (saucer && hit(sh.x, sh.y, saucer.x, saucer.y, C.SHIP_R + C.SAUCER_R)) ||
      enemy.some((b) =>
        hit(sh.x, sh.y, b.x, b.y, C.SHIP_R + C.SAUCER_BULLET_R),
      ))
  ) {
    q = { ...q, lives: q.lives - 1 };
    audio.play(C.CUES.death);
    sh = q.lives > 0 ? { ...ship(), invuln: C.INVULN_TIME } : sh;
    q = q.lives > 0 ? q : { ...q, screen: "gameover" };
  }
  const cd = Math.hypot(sh.x - C.STAR_X, sh.y - C.STAR_Y);
  if (cd < C.CORE_R + C.SHIP_R) {
    const a = angle(sh.x - C.STAR_X, sh.y - C.STAR_Y),
      nx = Math.cos(a),
      ny = Math.sin(a),
      into = sh.vx * nx + sh.vy * ny;
    sh = {
      ...sh,
      x: C.STAR_X + nx * (C.CORE_R + C.SHIP_R),
      y: C.STAR_Y + ny * (C.CORE_R + C.SHIP_R),
      vx: sh.vx - Math.min(0, into) * nx,
      vy: sh.vy - Math.min(0, into) * ny,
    };
  }
  if (q.score >= q.extraLifeMark + C.EXTRA_LIFE_STEP) {
    q = {
      ...q,
      lives:
        q.lives +
        Math.floor(q.score / C.EXTRA_LIFE_STEP) -
        Math.floor(q.extraLifeMark / C.EXTRA_LIFE_STEP),
      extraLifeMark: q.score,
    };
    audio.play(C.CUES.extraLife);
  }
  if (q.waveBanner > 0) {
    const b = Math.max(0, q.waveBanner - C.TICK_DT);
    q = { ...q, waveBanner: b };
    if (b === 0 && q.waveSpawning) q = waves({ ...q, rocks: [] });
  } else if (q.waveSpawning && rocks.length === 0 && q.wave > 0)
    q = { ...q, wave: q.wave + 1, waveBanner: C.WAVE_BANNER_TIME };
  if (q.wave === 0 && q.screen === "playing") q = waves({ ...q, wave: 1 });
  return {
    ...q,
    ship: sh,
    bullets,
    enemyBullets: enemy,
    rocks,
    torpedoes,
    saucer,
    saucerClock: sc,
    nextId,
  };
}

const newGame = (): ShatterState =>
  waves({ ...initial(), screen: "playing", wave: 1 });

function act(s: ShatterState): ShatterState {
  if (s.screen === "title")
    return s.menuIndex === 0 ? newGame() : { ...s, screen: "howto" };
  if (s.screen === "howto") return { ...s, screen: "title", menuIndex: 1 };
  if (s.screen === "paused")
    return s.menuIndex === 0
      ? { ...s, screen: "playing" }
      : s.menuIndex === 1
        ? newGame()
        : { ...initial() };
  if (s.screen === "gameover")
    return s.menuIndex === 0 ? newGame() : { ...initial() };
  return s;
}
function update(
  state: DeepReadonly<ShatterState>,
  api: UpdateApi,
  elapsed: number,
): ShatterState {
  let s: ShatterState = {
    ...state,
    ship: { ...state.ship },
    bullets: [...state.bullets],
    rocks: [...state.rocks],
    enemyBullets: [...state.enemyBullets],
    torpedoes: [...state.torpedoes],
    muted: api.audio.muted(),
  };
  if (api.input.pressed("mute")) {
    api.audio.setMuted(!s.muted);
    s = { ...s, muted: !s.muted };
  }
  if (s.screen === "playing" && api.input.pressed("pause"))
    return { ...s, screen: "paused" };
  if (
    s.screen === "paused" &&
    (api.input.pressed("pause") || api.input.pressed("back"))
  )
    return { ...s, screen: "playing" };
  if (s.screen !== "playing") {
    if (api.input.pressed("back"))
      return { ...s, screen: "title", menuIndex: s.screen === "howto" ? 1 : 0 };
    const n = count(s.screen);
    if (api.input.pressed("up"))
      s = { ...s, menuIndex: (s.menuIndex + n - 1) % n };
    if (api.input.pressed("down"))
      s = { ...s, menuIndex: (s.menuIndex + 1) % n };
    if (api.input.pressed("confirm")) s = act(s);
    return s;
  }
  let t = s.tickClock + Math.min(elapsed, 0.25);
  const input = {
    left: api.input.value("left") > 0,
    right: api.input.value("right") > 0,
    up: api.input.value("up") > 0,
    fire: api.input.value("a") > 0,
    torpedo: api.input.pressed("b"),
  };
  while (t >= C.TICK_DT) {
    s = step(s, input, api.audio);
    input.fire = false;
    input.torpedo = false;
    t -= C.TICK_DT;
  }
  return { ...s, tickClock: t };
}

function render(s: DeepReadonly<ShatterState>, api: RenderApi): void {
  const c = api.ctx;
  c.save();
  c.fillStyle = BACKGROUND;
  c.fillRect(0, 0, W, H);
  const g = c.createRadialGradient(
    C.STAR_X,
    C.STAR_Y,
    C.CORE_R,
    C.STAR_X,
    C.STAR_Y,
    C.HALO_R * 1.5,
  );
  g.addColorStop(0, "#f5c45c66");
  g.addColorStop(1, "#f5c45c00");
  c.fillStyle = g;
  c.beginPath();
  c.arc(C.STAR_X, C.STAR_Y, C.HALO_R * 1.5, 0, 7);
  c.fill();
  c.fillStyle = "#ffd15c";
  c.shadowColor = "#ff944d";
  c.shadowBlur = 25;
  c.beginPath();
  c.arc(C.STAR_X, C.STAR_Y, C.CORE_R, 0, 7);
  c.fill();
  c.shadowBlur = 0;
  const draw = (x: number, y: number, r: number, fn: () => void) => {
    for (const dx of [-W, 0, W])
      for (const dy of [-H, 0, H])
        if (
          x + dx + r > 0 &&
          x + dx - r < W &&
          y + dy + r > 0 &&
          y + dy - r < H
        ) {
          c.save();
          c.translate(x + dx, y + dy);
          fn();
          c.restore();
        }
  };
  for (const r of s.rocks)
    draw(r.x, r.y, C.ROCK_RADIUS[r.size], () => {
      c.strokeStyle = r.flash ? "#fff" : "#aeb8d2";
      c.lineWidth = 3;
      c.beginPath();
      for (let i = 0; i < 8; i++) {
        const a = r.spin + (i * Math.PI) / 4,
          rr = C.ROCK_RADIUS[r.size] * (0.78 + (i % 3) / 8);
        i
          ? c.lineTo(Math.cos(a) * rr, Math.sin(a) * rr)
          : c.moveTo(Math.cos(a) * rr, Math.sin(a) * rr);
      }
      c.closePath();
      c.stroke();
    });
  for (const b of s.bullets)
    draw(b.x, b.y, 3, () => {
      c.fillStyle = "#8df5ff";
      c.beginPath();
      c.arc(0, 0, 3, 0, 7);
      c.fill();
    });
  for (const t of s.torpedoes)
    draw(t.x, t.y, 6, () => {
      c.fillStyle = "#fff";
      c.beginPath();
      c.arc(0, 0, 6, 0, 7);
      c.fill();
    });
  if (s.saucer)
    draw(s.saucer.x, s.saucer.y, 18, () => {
      c.fillStyle = "#ff6fa8";
      c.beginPath();
      c.ellipse(0, 0, 24, 9, 0, 0, 7);
      c.fill();
    });
  draw(s.ship.x, s.ship.y, 14, () => {
    c.save();
    c.rotate(s.ship.angle);
    c.strokeStyle = s.ship.invuln ? "#fff2a4" : "#eef5ff";
    c.lineWidth = 3;
    c.beginPath();
    c.moveTo(18, 0);
    c.lineTo(-12, 10);
    c.lineTo(-7, 0);
    c.lineTo(-12, -10);
    c.closePath();
    c.stroke();
    c.restore();
  });
  c.fillStyle = "#eef5ff";
  c.font = "700 24px system-ui";
  c.fillText(String(s.score).padStart(6, "0"), 32, 42);
  if (s.screen === "playing") {
    c.font = "14px system-ui";
    c.fillStyle = "#8df5ff";
    c.fillText(`WAVE ${s.wave}`, 32, 66);
    c.fillText("TORPEDO", 32, 134);
    c.strokeStyle = "#315071";
    c.strokeRect(32, 142, 110, 8);
    c.fillRect(32, 142, 110 * s.torpedoCharge, 8);
  } else {
    c.fillStyle = "#070916cc";
    c.fillRect(0, 0, W, H);
    c.textAlign = "center";
    c.fillStyle = "#f4f7ff";
    c.font = "900 82px system-ui";
    c.fillText(C.TITLE_TEXT, W / 2, 190);
    c.font = "16px system-ui";
    c.fillStyle = "#8df5ff";
    c.fillText(C.TAGLINE_TEXT, W / 2, 225);
    if (s.screen === "howto") {
      c.font = "18px system-ui";
      c.fillStyle = "#d3def7";
      [
        "SHOOT EVERY ROCK THROUGH ITS FRAGMENTS.",
        "THE STAR PULLS ROCKS AND BULLETS — NEVER YOUR SHIP.",
        "TORPEDO: GUIDED, TRUE THROUGH THE WELL, TEN-SECOND RECHARGE.",
        "ARROWS / WASD FLY • SPACE FIRE • F TORPEDO • ENTER SELECT",
        "ESC BACK / PAUSE • P PAUSE • M MUTE",
      ].forEach((x, i) => c.fillText(x, W / 2, 300 + i * 38));
    } else {
      const xs =
        s.screen === "title"
          ? C.TITLE_ITEMS
          : s.screen === "paused"
            ? C.PAUSE_ITEMS
            : C.GAMEOVER_ITEMS;
      c.font = "700 24px system-ui";
      xs.forEach((x, i) => {
        c.fillStyle = i === s.menuIndex ? "#8df5ff" : "#b6c4df";
        c.fillText(
          `${i === s.menuIndex ? "> " : "  "}${x}`,
          W / 2,
          390 + i * 68,
        );
      });
    }
    c.textAlign = "left";
  }
  c.restore();
}

export const game: Game<ShatterState, ShatterDebugApi> = {
  initialize(api: InitApi<ShatterState>) {
    for (const a of C.ACTIONS) api.input.register(a, C.BINDINGS[a]);
    for (const [name, freq] of Object.entries(C.CUES))
      api.audio.define(freq, {
        freq: name === "fire" ? 520 : 220,
        durationMs: 100,
      });
    return [initial(), debug()];
  },
  update,
  render,
};
