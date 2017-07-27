import { ExtractJwt, StrategyOptions } from 'passport-jwt';

export let JwtOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: 'simple-server-key',
};
