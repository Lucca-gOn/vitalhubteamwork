SELECT TOP (1000) [ID]
      ,[Especialidade]
  FROM [VitalHub_G09M].[dbo].[Especialidades]

  USE [VitalHub_G09M]

  insert into Especialidades values
  (NEWID(),'Cardiologista'),
  (NEWID(),'Pediatria'),
  (NEWID(),'Otorrinolaringologista')
  