import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { TeamService } from './team.service';
import { Prisma, Team } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Controller('/team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  async getAllTeams(): Promise<Team[]> {
    return this.teamService.teams();
  }

  @Get('/:id')
  async getTeamById(@Param('id') id: string): Promise<Team> {
    return this.teamService.team({ id: Number(id) });
  }

  @Post()
  async createTeam(
    @Body() teamData: Omit<Prisma.TeamCreateInput, 'score' | 'linScore'>,
  ): Promise<Team> {
    return this.teamService.createTeam(teamData);
  }
}
