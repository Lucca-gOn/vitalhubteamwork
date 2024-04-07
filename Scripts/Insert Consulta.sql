SELECT TOP (1000) [ID]
      ,[SituacaoID]
      ,[PacienteID]
      ,[MedicoClinicaID]
      ,[ReceitaID]
      ,[PrioridadeID]
      ,[DataConsulta]
      ,[Descricao]
      ,[Diagnostico]
  FROM [VitalHub_G09M].[dbo].[Consultas]

  USE [VitalHub_G09M]

  insert into Consultas values
  (NEWID(),
  '3DF19A49-273A-4298-B581-6E735F190EAC',
  '375A49B0-F775-4294-BAD7-E2BB68BBAAF6',
  '95DF1C0B-8BB9-4494-B282-01A25067FAEB',
  '8B2FCB05-077B-4531-8472-F86D521DDF3C1',
  '894ADE0F-F58E-49DB-B605-37207732B7C8', 
  '2024-04-03T00:00:00',
  'Teste 1 testado',
  'Teste 2 testado')