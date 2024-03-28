SELECT TOP (1000) [ID]
      ,[Especialidade]
  FROM [VitalHub_G09M].[dbo].[Especialidades]


  insert into Especialidades values
  (NEWID(),'Cardiologista'),
  (NEWID(),'Pediatria'),
  (NEWID(),'Otorrinolaringologista')
  